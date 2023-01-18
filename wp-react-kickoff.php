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



// Add an action for the 'filter_products_list' AJAX request for logged-in users
add_action( 'wp_ajax_filter_products_list', 'filter_products_list_callback' );

// Add an action for the 'filter_products_list' AJAX request for non-logged-in users
add_action( 'wp_ajax_nopriv_filter_products_list', 'filter_products_list_callback' );

/**
 * Callback function for the 'filter_products_list' AJAX request
 *
 * @param 	none
 * @return 	void
 */

function filter_products_list_callback() {
    if( wp_verify_nonce( $_POST['_wpnonce'], 'form-create-nonce' ) ){
         global $wp_query,$wp;

        // get current url with query string.

        $taxonomies = $_POST['option']; // Associative array of taxonomy=>taxonomy term slugs passed from the Ajax call
        $url = $_POST['url']; // Fetch Page URL
        $tax_query = array(); // Initialize an empty array to store taxonomy query
        $tax_count = 0; // To count the number of taxonomies passed as a relation parameter needs to be passed if there are more than 1
        $post_per_page = 10;
        // Default arguments array
        $args = array(
            'post_type' => 'product',
            'posts_per_page' => $post_per_page
        );

        // Loop through the posted taxonomies
        foreach ($taxonomies as $taxonomy) { // Iterate through the taxonomies
            if ($taxonomy["value"] != "") { // Only if value is present for taxonomy
                if($taxonomy["name"] === 'afCategory[]'){
                    array_push($tax_query, array('taxonomy' => $_POST['taxonomy'], 'field' => 'slug', 'terms' => $taxonomy['value'])); // Push the taxonomy query to the array
                    if ($tax_count > 0) $tax_query['relation'] = 'AND'; // Add 'relation' parameter if more than one
                    $tax_count++; // Increment counter
                }
            }
        }
        if( isset( $_POST['pager'] ) && $_POST['pager'] <> ''){
            if( is_numeric($_POST['pager']) ){
                $args['paged'] = $_POST['pager'];
            }else{
                // Parse the URL into its components
                $url = parse_url($_POST['pager_url']);

                $findnumeric_value =  preg_replace("/[^0-9]/", "" , $url);

                $args['paged'] = $findnumeric_value['path'];

            }

        }else{
            $args['paged'] = (get_query_var('paged'))? get_query_var('paged') : get_query_var('page');
            $args['paged'] = empty($args['paged'])? 1: $args['paged'];
        }

        // Add taxonomy query if array is not empty
        if(!empty($tax_query)) {
            $args['tax_query'] = $tax_query;
        }

        $woo_posts = new WP_Query($args);
        $response = ""; // Initialize empty response string
        $pagination = ''; // Initialize empty Pagination string
        $total = $woo_posts->found_posts;

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
            $pagination .= wp_custom_pagination($woo_posts->max_num_pages,$args,'',$url);
        } else {
            $response = "No products found.";
        }


        if ( 1 === intval( $total ) ) {
            $newtag_html = __( 'Showing the single result', 'woocommerce' );
        } elseif ( $total <= $post_per_page || -1 === $post_per_page ) {
            /* translators: %d: total results */
            $newtag_html = sprintf( _n( 'Showing all %d result', 'Showing all %d results', $total, 'woocommerce' ), $total );
        } else {
            $first = ( $post_per_page * $args['paged'] ) - $post_per_page + 1;
            $last  = min( $total, $post_per_page * $args['paged'] );
            /* translators: 1: first result 2: last result 3: total results */
            $newtag_html = sprintf( _nx( 'Showing %1$d-%2$d of %3$d result', 'Showing %1$d-%2$d of %3$d results', $total, 'with first and last result', 'woocommerce' ), $first, $last, $total );
        }


        $arr = array();
        $arr[0] = $newtag_html;
        $arr[1] = $response;
        $arr[2] = $pagination;

        echo json_encode($arr);
        wp_reset_postdata();
        exit; // this is required to terminate immediately and return a proper response
    }
}

function wp_custom_pagination($max_num_pages, $args = [], $class = 'pagination',$url) {

    global $wp_rewrite;

    // Again - hard coded, you should make it dynamic though

    $jquery_code = "<script>
    jQuery(document).ready(function($){
    $('.wpaf-page-numbers a').on('click',function(e) {
            e.preventDefault();
            var admin_form = $('#wpaf-form');
            var data_source = admin_form.attr('data-source');
            var ajax_url = admin_form.attr('data-ajax');
            var nonce = admin_form.attr('data-security');
            var url = admin_form.attr('data-url');
            var action = 'afpagination';
            var pager = $(this).text();
            var pager_url = $(this).attr('href');

            $.ajax({
                type: 'POST',
                url: ajax_url,
                dataType : 'json',
                data: { 'taxonomy':data_source, '_wpnonce': nonce, 'action': action,'option': admin_form.serializeArray(),'pager':pager,'pager_url':pager_url },
                success: function(response) {
                    $('.woocommerce-result-count').text(response[0]);
                    $('.wpaf-pagination-wrap').remove();
					$('.woocommerce-pagination').remove();
					$('.products').html(response[1]);
                    $('.products').parent().append(response[2]);
                }
            })
        })
    })</script><style>.wpaf-pagination-wrap .wpaf-page-numbers{text-align: center;}</style>";
    $script_jquery = str_replace(array("\r\n", "\r", "\n"), '', $jquery_code);

    $base = trailingslashit( $url ) . "{$wp_rewrite->pagination_base}/%#%/";
    return '<div class="wpaf-pagination-wrap">'.$script_jquery . '<div class="wpaf-page-numbers">' . paginate_links( array(
        'base' => $base,
        'format' => '?paged=%#%',
        'current' => max( 1, $args['paged'] ),
        'show_all' => false,
        'total' => $max_num_pages,
        'mid_size' => 0,
        'end_size' => 3,
    ) ) . '</div></div>';

}


// Add an action for the 'afpagination' AJAX request for logged-in users
add_action( 'wp_ajax_afpagination', 'filter_products_list_callback' );

// Add an action for the 'afpagination' AJAX request for non-logged-in users
add_action( 'wp_ajax_nopriv_afpagination', 'filter_products_list_callback' );

/**
 * Callback function for the 'afpagination' AJAX request
 *
 * @param 	none
 * @return 	void
 */

function afpagination_callback(){

}
