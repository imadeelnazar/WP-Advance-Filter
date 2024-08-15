<?php
/**
 * Creating Shortcodes handling their trigger
 */
if(!class_exists('wpAF_render')){

    class wpAF_render{

        /* (array) Get Data From Options */
        public $data = [];

        /* (array) Saved shortcode attributes */
        public $shortcode_atts = [];

        /**
         * Fire Right Away
         * @since 1.0
         */
        function __construct() {
            $this->data = get_option('wpaf_settings');

            add_action('init',array($this,'create_shortcode'));
            add_filter('do_shortcode_tag', array($this,'render_shortcodes'), 10, 2);
            add_action('pre_get_posts',array($this,'filtered_data'));
            add_filter( 'shortcode_atts_products', array($this,'modify_woocommerce_products_shortcode_atts' ));

        }

        /**
        * Append Data into Shortcode to manage the listing
        * @since 1.0
        */
        function render_shortcodes( $output, $tag ) {
            global $wp,$wp_query;

            // get current url with query string.
            $current_url =  home_url( $wp->request );

            $search_item = '';
            //Function to hold get parametters
            // if(isset($_POST)){
            //     if(!empty($_POST)){
            //         $html .= '<div class="wpha_pos$_POST_variable_view">';
            //         foreach($_POST as $key => $value)
            //         {
            //             if($key <> 'keyword'){
            //                 if($value <> ''){
            //                     $acurate_url = add_query_arg( $key, $value , esc_url($current_url) );
            //                     $removable_url = remove_query_arg( $key );
            //                     $new_name = str_replace('_',' ',$key);
            //                     $new_name = str_replace('type','',$new_name);
            //                     $new_name = str_replace('select','',$new_name);
            //                     $new_name = str_replace('range','',$new_name);
            //                     $html .= '<a class="wpjb-theme-btn" href="'.esc_url($removable_url).'" >
            //                     <small class="hide">'.esc_attr($new_name).'</small>
            //                     <strong>'.esc_html($value).'</strong> <i class="fa fa-times"></i></a>';
            //                 }
            //             }
            //         }
            //         $html .= '<a class="wpjb-theme-btn" href="'.esc_url($current_url).'" ><small class="hide"></small> <strong>Clear All</strong> <i class="fa fa-times"></i></a>';
            //         $html .= '</div>';
            //     }
            // }
            $html = '';

            foreach($this->data as $key => $items){
                $shortcode = $this->format_shortcode($items['fullName']);
                if($tag == $shortcode){

                    $html .= '<form data-type="'.esc_attr($items['facetType']).'" data-source="'.esc_attr($items['dataSource']).'" data-url="'.esc_url( $current_url ).'" method="POST" data-action="filter_products_list" data-security="' . wp_create_nonce('form-create-nonce') . '" data-ajax="'.admin_url('admin-ajax.php').'" id="wpaf-form">';

                    $html.='<input type="hidden" name="afTaxonomy" value="'.esc_attr($items['dataSource']).'" />';

                    $taxonomies = get_terms( $items['dataSource'], array(
                        'hide_empty' => false,
                    ) );
                    // $tag['type'] = $items['facetType'];
                    // $tag['category'] = $items['dataSource'];

                    if(isset($items['facetType']) && $items['facetType'] === 'dropdown'){
                        if ( !empty($taxonomies) ) :
                            $html .= '<select class="select-box" name="afCategory">';
                            $html .= '<option value="">--Select Any--</option>';
                            foreach( $taxonomies as $category ) {
                                if( $category->parent == 0 ) {
                                    $html.= '<option ';
                                    if(isset($_POST['afCategory']) && $_POST['afCategory'] == $category->slug){$html.= ' selected '; }
                                    $html.= ' value="'. esc_attr( $category->slug ) .'">'.esc_html( $category->name );
                                    foreach( $taxonomies as $subcategory ) {
                                        if($subcategory->parent == $category->term_id) {
                                        $html.= '<option ';
                                        if(isset($_POST['afCategory']) && $_POST['afCategory'] == $subcategory->slug){$html.= ' selected '; }
                                        $html.= ' value="'. esc_attr( $subcategory->slug ) .'">
                                            '. esc_html( $subcategory->name ) .'</option>';
                                        }
                                    }
                                    $html.='</option>';
                                }
                            }
                            $html.='</select>';
                            $html.='<input type="hidden" name="afType" value="'.esc_attr($items['facetType']).'" />';
                        endif;
                    }else if(isset($items['facetType']) && $items['facetType'] === 'link'){

                        if ( !empty($taxonomies) ) {
                            $html .= '<ul class="af-woocommerce-link">';
                            foreach( $taxonomies as $category ) {

                                $link = esc_url(add_query_arg(array(
                                    'afType'    => esc_attr($items['facetType']),
                                    'afTaxonomy'=> esc_attr($items['dataSource']),
                                    'afCategory'=> esc_attr($category->slug)
                                ), get_permalink($current_url)));
                                if( $category->parent == 0 ) {
                                    if ( count( get_term_children( $category->term_id, $items['dataSource'] ) ) > 0 ) {
                                        $html.= '<li class="has-children '. esc_attr( $category->slug ) .'"><a href="'.esc_url($link).'">'. esc_html( $category->name ).'</a>';
                                    }else{
                                        $html.= '<li class="'. esc_attr( $category->slug ) .'"><a href="'.esc_url($link).'">'. esc_html( $category->name ).'</a>';
                                    }

                                    if ( count( get_term_children( $category->term_id, $items['dataSource'] ) ) > 0 ) {
                                        $html.= '<ul>';
                                        foreach( $taxonomies as $subcategory ) {
                                            $link_sub = add_query_arg( 'af_category', $subcategory->slug , esc_url(get_permalink($current_url)) );
                                            if($subcategory->parent == $category->term_id) {
                                            $html.= '<li class="'. esc_attr( $subcategory->term_id ) .'">
                                                <a href="'.esc_url($link_sub).'">'. esc_html( $subcategory->name ) .'</a></li>';
                                            }
                                        }
                                        $html.='</ul>';
                                    }

                                    $html.='</li>';
                                }
                            }
                            $html.='</ul>';
                           $html.='<input type="hidden" name="afType" value="'.esc_attr($items['facetType']).'" />';
                        }
                    }else if(isset($items['facetType']) && $items['facetType'] === 'checkbox'){
                        if ( !empty($taxonomies) ) :

                            $html .= '<ul class="af-woocommerce-link">';
                            foreach( $taxonomies as $category ) {
                                $link = add_query_arg( 'af_category', $category->slug , esc_url(get_permalink($current_url)) );
                                if( $category->parent == 0 ) {
                                    if ( count( get_term_children( $category->term_id, $items['dataSource'] ) ) > 0 ) {
                                        $html.= '<li class="has-children '. esc_attr( $category->slug ) .'"><input class="checkbox"';
                                        if(isset($_POST['afCategory']) && in_array($category->slug, $_POST['afCategory'])){$html.= ' checked=checked '; }
                                        $html.= ' type="checkbox" id="check-box-'. esc_html( $category->slug ).'" value="'. esc_html( $category->slug ).'" name="afCategory"> <label for="check-box-'. esc_html( $category->slug ).'">'. esc_html( $category->name ).'</label>';
                                    }else{
                                        $html.= '<li class="'. esc_attr( $category->slug ) .'"><input class="checkbox"';
                                        if(isset($_POST['afCategory']) && in_array($category->slug, $_POST['afCategory'])){ $html.= ' checked=checked '; }
                                        $html.= 'type="checkbox" value="'. esc_html( $category->slug ).'" id="check-box-'. esc_html( $category->slug ).'" name="afCategory"> <label for="check-box-'. esc_html( $category->slug ).'">'. esc_html( $category->name ).'</label>';
                                    }

                                    if ( count( get_term_children( $category->term_id, $items['dataSource'] ) ) > 0 ) {
                                        $html.= '<ul>';
                                        foreach( $taxonomies as $subcategory ) {
                                            $link_sub = add_query_arg( 'af_category', $subcategory->slug , esc_url(get_permalink($current_url)) );
                                            if($subcategory->parent == $category->term_id) {
                                            $html.= '<li class="'. esc_attr( $subcategory->slug ) .'"><input class="checkbox"';
                                                if(isset($_POST['afCategory']) && in_array($subcategory->slug, $_POST['afCategory'])){$html.= ' checked=checked '; }
                                                $html.= 'type="checkbox" id="child-check-box-'. esc_html( $subcategory->slug ).'"
                                                value="'. esc_html( $subcategory->slug ).'"
                                                name="afCategory"> <label for="child-check-box-'. esc_html( $subcategory->slug ).'">'. esc_html( $subcategory->name ).'</label>';
                                                $html.= $this->subcategories($taxonomies, $subcategory, $current_url);
                                                $html.= '</li>';
                                            }
                                        }
                                        $html.='</ul>';
                                    }
                                    $html.='</li>';
                                }
                            }
                            $html.='</ul>';
                            $html.='<input type="hidden" name="afType" value="'.esc_attr($items['facetType']).'" />';
                        endif;
                    }
                    if(isset($_POST['afCategory']) && $_POST['afCategory'] <> ''){
                        $html.='<a class="btn-clear" href="'.esc_url($current_url).'">Clear</a>';
                    }
                    $html .= '<input type="submit" class="submit-n button wp-element-button  product_type_product-cart" value="submit">';
                    $html .= '</form>';
                }
            }
            $output .= $html;
            return $output;
        }

        /**
        * Sub Categories to End Level
        * @param Taxonomies - Taxonomies or Terms
        * @param SubCategory - Sub Category
        * @param URL - Current Page URL
        * @since 1.0
        */
        function subcategories($taxonomies, $subcategory, $url){
            $html = '<ul>';
            foreach( $taxonomies as $subsubcategory ) {
                $link_sub = add_query_arg( 'af_category', $subcategory->slug , esc_url(get_permalink($url)) );
                if($subsubcategory->parent == $subcategory->term_id) {
                $html.= '<li class="'. esc_attr( $subsubcategory->slug ) .'"><input class="checkbox"';
                    if(isset($_POST['afCategory']) && in_array($subsubcategory->slug, $_POST['afCategory'])){$html.= ' checked=checked '; }
                    $html.= 'type="checkbox" id="child-check-box-'. esc_html( $subsubcategory->slug ).'"
                    value="'. esc_html( $subsubcategory->slug ).'"
                    name="afCategory"> <label for="child-check-box-'. esc_html( $subsubcategory->slug ).'">'. esc_html( $subsubcategory->name ).'</label>';
                    $html.= $this->subcategories($taxonomies, $subsubcategory, $url);
                    $html.= '</li>';
                }
            }
            $html.= '</ul>';
            return $html;
        }


       /**
        * Filtered Posts by query parameters
        * af_category
        * main query altered here to show results
        * on archive and default pages
        * @param Query - Main Query
        * @since 1.0
        */
        function filtered_data($query) {

            if (!is_admin() && is_post_type_archive( 'product' ) && $query->is_main_query()) {

                if(isset($_POST['afCategory']) && $_POST['afCategory'] <> ''){
                    $query->set('tax_query', array(
                        'relation' => 'AND',
                        array (
                            'taxonomy' => $_POST['afTaxonomy'],
                            'field' => 'slug',
                            'terms' => $_POST['afCategory']
                            )
                        )
                    );
                }
                $query->set( 'orderby', 'data' );
                $query->set( 'order', 'DESC' );
                $query->set( 'posts_per_page', 12 );

            }else if ( ! is_admin() && $query->is_main_query() ) {

                // Get the queried object (which is your page)
                $queried_object = $query->get_queried_object();
                $post_content = isset($queried_object->post_content) ? $queried_object->post_content : ''; // Access the post content

                if ( has_block( 'woocommerce/all-products', $post_content ) ) {
                    // Check if taxonomy and category are set in the URL
                    if ( isset($_GET['afTaxonomy']) && isset($_GET['afCategory']) ) {

                        // Sanitize the inputs

                        $taxonomy = sanitize_key( html_entity_decode( $_GET['afTaxonomy'] ) );
                        $category = sanitize_title( html_entity_decode( $_GET['afCategory'] ) );

                        // Construct the tax_query array
                        $tax_query = array(
                            'taxonomy' => $taxonomy,
                            'field'    => 'slug',
                            'terms'    => $category,
                        );

                        // Apply the tax_query to the main query
                        $query->set( 'tax_query', array( $tax_query ) );
                        $query->set( 'orderby', 'data' );
                        $query->set( 'order', 'DESC' );
                        $query->set( 'posts_per_page', 20 );
                    }
                }
            }
        }

        function modify_woocommerce_products_shortcode_atts( $atts ) {
            if ( ! is_admin() ) {
                if(isset($_GET['afTaxonomy'])){
                    $taxonomy = sanitize_key(html_entity_decode($_GET['afTaxonomy']));
                    $category = sanitize_title(html_entity_decode($_GET['afCategory']));
                    // Set the category dynamically
                    $atts['category'] = $category; // Replace with your desired category slug

                    // Optional: Set additional attributes like orderby, order, and per_page
                    $atts['orderby'] = 'date';
                    $atts['order'] = 'DESC';
                    $atts['per_page'] = 12;
                }
            }

            return $atts;
        }



        /**
        * Hooks and Crooks
        * @since 1.0
        */
        function run_hooks() {

        }



        /**
        * Starting Function
        * @since 1.0
        */
        function create_shortcode(){

            // print_r($this->data);die;
            foreach($this->data as $key => $items){
                $shortcode = $this->format_shortcode($items['fullName']);
                add_shortcode($shortcode,array($this, 'shortcode_html'));
            }
        }


        /**
        * Format Shortcode
        * Style and Script
        * Submit Form on Change
        * @param attr - Shortcode Attributes
        * @param content - Content
        * @since 1.0
        */
        function format_shortcode($itemname){
            // Convert to lowercase
            $fullName = strtolower($itemname);

            // Replace spaces with underscores
            $fullName = str_replace(' ', '_', $fullName);

            // Remove any non-alphanumeric characters (optional)
            $fullName = preg_replace('/[^a-z0-9_]/', '', $fullName);

            return $fullName;
        }

        /**
        * Trigger Shortcode
        * Style and Script
        * Submit Form on Change
        * @param attr - Shortcode Attributes
        * @param content - Content
        * @since 1.0
        */
        function shortcode_html($atts,$content = null){
            $this->shortcode_atts[] = $atts;

            return '<style>.has-children ul{display:none;}.af-woocommerce-link li,.af-woocommerce-link li ul{list-style:none;}.af-woocommerce-link{list-style:none;padding:0px;}</style>';
        }

        /**
        * Render HTMl
        * @since 1.0
        */
        function render_ajax_call(){

            return 'ddd';
        }




    }
    $wpAF_render = new wpAF_render();
}




function modify_empty_query_vars($query) {
    // Ensure this modification is applied only to the main query on the front-end
    if (is_admin() || !$query->is_main_query()) {
        return;
    }

    // Check if the query is empty or lacks specific parameters and adjust accordingly
    if (empty($query->query_vars['s']) && empty($query->query_vars['post_type'])) {
        // Set default post type to 'product' if not already set
        // if (empty($query->query_vars['post_type'])) {
        //     $query->set('post_type', 'product');
        // }

        // Set default taxonomy query, for example, a specific product category
        if (empty($query->query_vars['tax_query'])) {
            $query->set('tax_query', array(
                array(
                    'taxonomy' => 'product_cat',
                    'field'    => 'slug',
                    'terms'    => 'category-a', // Replace with your category slug
                ),
            ));
        }

        // Add other default query vars as needed
        $query->set('posts_per_page', 10); // Set the number of posts to display
        $query->set('orderby', 'date');    // Order by date
        $query->set('order', 'DESC');      // Order direction
    }
}
add_action('pre_get_posts', 'modify_empty_query_vars');