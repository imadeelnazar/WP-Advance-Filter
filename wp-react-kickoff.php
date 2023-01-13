<?php
/**
 * Plugin Name: WP React KickOff
 * Author: Md. Rabiul Islam Robi
 * Author URI: https://github.com/robicse11127
 * Version: 1.0.0
 * Description: WordPress React KickOff.
 * Text-Domain: wp-react-kickoff
 */

if( ! defined( 'ABSPATH' ) ) : exit(); endif; // No direct access allowed.

/**
* Define Plugins Contants
*/
define ( 'WPRK_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define ( 'WPRK_URL', trailingslashit( plugins_url( '/', __FILE__ ) ) );

function wpaf_activation_hook() {
    // Save Initial Information
    $update_data = array();
	update_option('wprk_settings',$update_data);
}
register_activation_hook( __FILE__, 'wpaf_activation_hook' );

/**
 * Loading Necessary Scripts
 */
add_action( 'admin_enqueue_scripts', 'load_scripts' );
function load_scripts() {
    wp_enqueue_script( 'wp-react-kickoff', WPRK_URL . 'dist/bundle.js', [ 'jquery', 'wp-element' ], wp_rand(), true );
    wp_localize_script( 'wp-react-kickoff', 'appLocalizer', [
        'apiUrl' => home_url( '/wp-json' ),
        'nonce' => wp_create_nonce( 'wp_rest' ),
    ] );
}

require_once WPRK_PATH . 'classes/class-create-admin-menu.php';
require_once WPRK_PATH . 'classes/class-create-settings-routes.php';
if(!is_admin()){
    require_once WPRK_PATH . 'classes/class-create-shortcode.php';
    add_action('wp_enqueue_scripts','wpaf_enqueue_scripts');
}


/**
* Enque Scripts
* @since 1.0
*/
function wpaf_enqueue_scripts() {
    wp_register_script('wpaf-ajaxrequest', WPRK_URL.'asserts/script.js', false, '1.0', true);
    wp_enqueue_script('wpaf-ajaxrequest');
    // wp_enqueue_style( 'wpaf-ajaxrequest', WPRK_URL . '/asserts/style.css' );  //Font Awesome
}





add_action('wp_ajax_filter_products_list', 'filter_products');
add_action('wp_ajax_nopriv_filter_products_list', 'filter_products');

/**
* Filter Products
* @since 1.0
*/
function filter_products() {
    if( wp_verify_nonce( $_POST['_wpnonce'], 'form-create-nonce' ) ){
         global $wp_query,$wp;

            // get current url with query string.
            $current_url =  home_url( $wp->request );
        $taxonomies = $_POST['option']; // Associative array of taxonomy=>taxonomy term slugs passed from the Ajax call
        $tax_query = array(); // Initialize an empty array to store taxonomy query
        $tax_count = 0; // To count the number of taxonomies passed as a relation parameter needs to be passed if there are more than 1

        // Default arguments array
        $args = array(
            'post_type' => 'product',
            'posts_per_page' => '-1'
        );

        // Loop through the posted taxonomies
        foreach ($taxonomies as $taxonomy) { // Iterate through the taxonomies
            if ($taxonomy["value"] != "") { // Only if value is present for taxonomy
                if($taxonomy["name"] === 'afCategory[]'){
                    array_push($tax_query, array('taxonomy' => 'product_cat', 'field' => 'slug', 'terms' => $taxonomy['value'])); // Push the taxonomy query to the array
                    if ($tax_count > 0) $tax_query['relation'] = 'AND'; // Add 'relation' parameter if more than one
                    $tax_count++; // Increment counter
                }
            }
        }
        $args['paged'] = (get_query_var('paged'))? get_query_var('paged') : get_query_var('page');
		$args['paged'] = empty($args['paged'])? 1: $args['paged'];

        // Add taxonomy query if array is not empty
        if(!empty($tax_query)) {
            $args['tax_query'] = $tax_query;
        }

        $woo_posts = new WP_Query($args);
        $response = ""; // Initialize empty response string

        if ($woo_posts->have_posts()) {
            $class = 'product-cart';

            while ($woo_posts->have_posts()) {
                $woo_posts->the_post();
                global $post, $product;

                $response .= '<li id="woo-'.esc_attr(get_the_ID()).'" class="';
                $allClasses = get_post_class();
                foreach ($allClasses as $myclass) {
                    $response .= $myclass . " ";
                }
                $thumbnail_id = get_post_thumbnail_id(get_the_ID());
                if ( $thumbnail_id ) {
                    $image = wp_get_attachment_thumb_url( $thumbnail_id );
                } else {
                    $image = wc_placeholder_img_src();
                }
                $image_info = wp_get_attachment_image_src( get_post_thumbnail_id( $product->get_id() ), 'woocommerce_thumbnail' );

                $response .= '">';
                $response .= '<a href="'.esc_url(get_permalink()).'" class="woocommerce-LoopProduct-link woocommerce-loop-product__link">';
                if ( ! isset( $image_info[0] ) ) {
                    $response .= sprintf( '<img src="%s" alt="" width="500 height="500" />', wc_placeholder_img_src( 'woocommerce_thumbnail' ) );
                }else{
                    $response .= sprintf('<img data-testid="product-image" alt="%s" src="%s">',$product->get_title(),$image_info[0]);
                }
                $response .= '<h2 class="woocommerce-loop-product__title">'.esc_html(get_the_title()).'</h2>';
                $response .= '</a>';
                $response .=  apply_filters( 'woocommerce_loop_add_to_cart_link',
                sprintf( '<a href="%s" rel="nofollow" data-product_id="%s" data-product_sku="%s" class="button wp-element-button %s product_type_%s">Read More</a>',
                    esc_url( $product->add_to_cart_url() ),
                    esc_attr( isset( $quantity ) ? $quantity : 1 ),
                    esc_attr( $product->get_id() ),
                    esc_attr( $product->get_sku() ),
                    esc_attr( isset( $class ) ? $class : 'button' ),
                    esc_html( $product->add_to_cart_text() )
                ),
                $product );
                $response .=  '</li>';
            }
            //$response .= wpaf_get_pagination($woo_posts->max_num_pages,'',$args['paged'],$current_url);
        } else {
            $response = "No products found.";
        }

        echo json_encode($response); // Echo the response
        wp_reset_postdata();
        exit; // this is required to terminate immediately and return a proper response
    }
}

function wpaf_get_pagination($max_num_page, $current_page, $format = 'paged',$current_url){
    global $wp_rewrite;

    if( $max_num_page <= 1 ) return '';

    $big = 999999999; // need an unlikely integer

    // Again - hard coded, you should make it dynamic though
    $base = trailingslashit( $current_url ) . "{$wp_rewrite->pagination_base}/%#%/";
    return '<div class="mypagination">' . paginate_links( array(
        'base' => $base,
        'format' => '?paged=%#%',
        'current' => max( 1, $current_page ),
        'total' => $max_num_page,
        'prev_text'=> esc_html__('&lsaquo; Previous', 'kickoff'),
        'next_text'=> esc_html__('Next &rsaquo;', 'kickoff')
    ) ) . '</div>';
}