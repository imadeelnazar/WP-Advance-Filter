<?php

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
        global $wp_query, $wp;

        $taxonomies = $_POST['option']; // Associative array of taxonomy=>taxonomy term slugs passed from the Ajax call
        $url = $_POST['url']; // Fetch Page URL
        $tax_query = array(); // Initialize an empty array to store taxonomy query
        $post_per_page = 10;

        // Default arguments array
        $args = array(
            'post_type'      => sanitize_text_field($_POST['post_type']),
            'posts_per_page' => $post_per_page,
            'paged'          => 1, // default to page 1
        );

        // Loop through the posted taxonomies
        foreach ($taxonomies as $taxonomy_data) {
            if (!empty($taxonomy_data["value"])) {
                switch ($taxonomy_data["name"]) {
                    case 'afTaxonomy':
                        $taxonomy = sanitize_text_field($taxonomy_data["value"]);
                        break;

                    case 'afCategory':
                        $category[] = sanitize_text_field($taxonomy_data["value"]);
                        break;

                    case 'afType':
                        // Handle afType if needed
                        break;
                }
            }
        }


        // If taxonomy and category are both set, build the tax_query
        if (!empty($taxonomy) && !empty($category)) {
            $tax_query[] = array(
                'taxonomy' => $taxonomy,
                'field'    => 'slug',
                'terms'    => $category,
            );
        }

        // Add tax_query to args if it exists
        if (!empty($tax_query)) {
            $args['tax_query'] = $tax_query;
        }

        // Handle pagination
        if (isset($_POST['pager']) && !empty($_POST['pager'])) {
            if (is_numeric($_POST['pager'])) {
                $args['paged'] = intval($_POST['pager']);
            } else {
                // Extract numeric page value from the URL
                $parsed_url = parse_url($_POST['pager']);
                $page_num = preg_replace("/[^0-9]/", '', $parsed_url['path']);
                $args['paged'] = intval($page_num);
            }
        } else {
            $args['paged'] = max(1, get_query_var('paged') ?: get_query_var('page'));
        }

        $woo_posts = new WP_Query($args);
        $response = ""; // Initialize empty response string
        $pagination = ''; // Initialize empty Pagination string
        $total = $woo_posts->found_posts;
        $wpaf_id = '';

       if ($woo_posts->have_posts()) {
            $products = array();
            ob_start();

            // Start the loop
            while ($woo_posts->have_posts()) {
                $woo_posts->the_post();
                global $product;

                // Get the template part for the product
                wc_get_template_part('content', 'product');

                // $products[] = array(
                //     'title' => get_the_title(),
                //     'url' => get_permalink(),
                //     'image' => wp_get_attachment_image_src(get_post_thumbnail_id(), 'full')[0],
                //     'regular_price' => wc_price($product->get_regular_price()),
                //     'sale_price' => wc_price($product->get_sale_price())
                // );
            }

            // Pagination HTML
            // $pagination = paginate_links(array(
            //     'base' => '%_%',
            //     'format' => '?page=%#%',
            //     'current' => max(1, $args['paged']),
            //     'total' => $woo_posts->max_num_pages,
            //     'type' => 'array'
            // ));

            // if ($pagination) {
            //     foreach ($pagination as $page_link) {
            //         echo $page_link;
            //     }
            // }

            // Get the captured output
            $response = ob_get_clean();

            // Pagination
            $pagination = wp_custom_pagination($woo_posts->max_num_pages, $args, '', $url);

        } else {
            // Handle the case when no products/posts are found
            $response = isset($_POST['taxonomy']) && in_array($_POST['taxonomy'], array('product_cat', 'product_tag')) ? "No products found." : "No posts found.";
        }

        // Reset post data to ensure global $post is reset after a custom loop
        wp_reset_postdata();


        // Top Filtered HTML
        if ($total == 1) {
            $newtag_html = __( 'Showing the single result', 'woocommerce' );
        } elseif ($total <= $post_per_page || $post_per_page == -1) {
            $newtag_html = sprintf( _n( 'Showing all %d result', 'Showing all %d results', $total, 'woocommerce' ), $total );
        } else {
            $first = ($post_per_page * $args['paged']) - $post_per_page + 1;
            $last  = min($total, $post_per_page * $args['paged']);
            $newtag_html = sprintf( _nx( 'Showing %1$d-%2$d of %3$d result', 'Showing %1$d-%2$d of %3$d results', $total, 'with first and last result', 'woocommerce' ), $first, $last, $total );
        }

        $arr = array($newtag_html, $response, $pagination);

        echo json_encode($arr);
        wp_reset_postdata();
        exit; // this is required to terminate immediately and return a proper response
    }
}

function wp_custom_pagination($max_num_pages, $args = [], $class = 'pagination',$url='') {

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

            if(data_source === 'category' || data_source === 'post_tag'){
                $.ajax({
                    type: 'POST',
                    url: ajax_url,
                    dataType : 'json',
                    data: { 'taxonomy':data_source, 'post_type':'post','_wpnonce': nonce, 'action': action,'option': admin_form.serializeArray(),'pager':pager,'pager_url':pager_url },
                    success: function(response) {
                        $('.woocommerce-result-count').text(response[0]);
                        $('.wpaf-pagination-wrap').remove();
                        $('.woocommerce-pagination').remove();
                        $('.wp-block-post-template').html(response[1]);
					    $('.wp-block-post-template').parent().append(response[2]);

                    }
                })
            }else{
                $.ajax({
                    type: 'POST',
                    url: ajax_url,
                    dataType : 'json',
                    data: { 'taxonomy':data_source, 'post_type':'product','_wpnonce': nonce, 'action': action,'option': admin_form.serializeArray(),'pager':pager,'pager_url':pager_url },
                    success: function(response) {
                        $('.woocommerce-result-count').text(response[0]);
                        $('.wpaf-pagination-wrap').remove();
                        $('.woocommerce-pagination').remove();
                        $('.products').html(response[1]);
                        $('.products').parent().append(response[2]);
                    }
                })
            }
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


