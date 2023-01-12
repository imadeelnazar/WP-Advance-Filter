<?php
/**
 * Creating Shortcodes handling their trigger
 */
if(!class_exists('wpaf_Show')){

    class wpaf_Show{

        /* (array) Get Data From Options */
        public $data = [];

        /* (array) Saved shortcode attributes */
        public $shortcode_atts = [];

        /**
         * Fire Right Away
         * @since 1.0
         */
        function __construct() {
            $wprk_settings = get_option('wprk_settings');
            $this->data = $wprk_settings;
            // print_r($this->data);
            // foreach($this->data as $item){
            //     add_shortcode($item['fullName'], array($this,'create_shortcode'));
            // }

            add_action('init',array($this,'create_shortcode'));
            add_filter('do_shortcode_tag', array($this,'append_data_into_shortcode'), 10, 2);
            add_action('pre_get_posts',array($this,'shop_filtered_posts'));
        }


        /**
        * Append Data into Shortcode to manage the listing
        * @since 1.0
        */
        function append_data_into_shortcode( $output, $tag ) {
            global $wp_query,$wp;

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
                if($tag == $items['fullName']){
                    $html .= '<form method="POST" id="wpaf-form">';

                    // echo '<pre>';print_r($wp_query);
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
                        if ( !empty($taxonomies) ) :
                            $html .= '<ul class="af-woocommerce-link">';
                            foreach( $taxonomies as $category ) {
                                $link = add_query_arg( 'af_category', $category->slug , esc_url(get_permalink($current_url)) );
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
                        endif;
                    }else if(isset($items['facetType']) && $items['facetType'] === 'checkbox'){
                        if ( !empty($taxonomies) ) :

                            $html .= '<ul class="af-woocommerce-link">';
                            foreach( $taxonomies as $category ) {
                                $link = add_query_arg( 'af_category', $category->slug , esc_url(get_permalink($current_url)) );
                                if( $category->parent == 0 ) {
                                    if ( count( get_term_children( $category->term_id, $items['dataSource'] ) ) > 0 ) {
                                        $html.= '<li class="has-children '. esc_attr( $category->slug ) .'"><input class="checkbox"';
                                        if(isset($_POST['afCategory']) && in_array($category->slug, $_POST['afCategory'])){$html.= ' checked=checked '; }
                                        $html.= ' type="checkbox" id="check-box-'. esc_html( $category->slug ).'" value="'. esc_html( $category->slug ).'" name="afCategory[]"> <label for="check-box-'. esc_html( $category->slug ).'">'. esc_html( $category->name ).'</label>';
                                    }else{
                                        $html.= '<li class="'. esc_attr( $category->slug ) .'"><input class="checkbox"';
                                        if(isset($_POST['afCategory']) && in_array($category->slug, $_POST['afCategory'])){ $html.= ' checked=checked '; }
                                        $html.= 'type="checkbox" value="'. esc_html( $category->slug ).'" id="check-box-'. esc_html( $category->slug ).'" name="afCategory[]"> <label for="check-box-'. esc_html( $category->slug ).'">'. esc_html( $category->name ).'</label>';
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
                                                name="afCategory[]"> <label for="child-check-box-'. esc_html( $subcategory->slug ).'">'. esc_html( $subcategory->name ).'</label>';
                                                $html.= $this->subcategories_listing($taxonomies, $subcategory, $current_url);
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
                    $html .= '</form>';
                }
            }
            $output .= $html;


            return $output;
        }



        /**
        * Sub Categories to End Level
        * Taxonomy
        * Sub Category
        * URL
        * @since 1.0
        */
        function subcategories_listing($taxonomies, $subcategory, $url){
            $html = '<ul>';
            foreach( $taxonomies as $subsubcategory ) {
                $link_sub = add_query_arg( 'af_category', $subcategory->slug , esc_url(get_permalink($url)) );
                if($subsubcategory->parent == $subcategory->term_id) {
                $html.= '<li class="'. esc_attr( $subsubcategory->slug ) .'"><input class="checkbox"';
                    if(isset($_POST['afCategory']) && in_array($subsubcategory->slug, $_POST['afCategory'])){$html.= ' checked=checked '; }
                    $html.= 'type="checkbox" id="child-check-box-'. esc_html( $subsubcategory->slug ).'"
                    value="'. esc_html( $subsubcategory->slug ).'"
                    name="afCategory[]"> <label for="child-check-box-'. esc_html( $subsubcategory->slug ).'">'. esc_html( $subsubcategory->name ).'</label>';
                    $html.= $this->subcategories_listing($taxonomies, $subsubcategory, $url);
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
        * @since 1.0
        */
        function shop_filtered_posts($query) {

            if (!is_admin() && is_post_type_archive( 'product' ) && $query->is_main_query()) {

                if(isset($_POST['afCategory']) && $_POST['afCategory'] <> ''){
                    $query->set('tax_query', array(
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
            }
        }


        /**
        * Event listeners
        * @since 1.0
        */
        function run_hooks() {

        }

        /**
        * Starting Function
        * @since 1.0
        */
        function create_shortcode(){
            foreach($this->data as $key => $items){
                add_shortcode($items['fullName'],array($this, 'shortcode'));
            }


        }



        function shortcode($atts,$content = null){
            $this->shortcode_atts[] = $atts;


            // extract(shortcode_atts(array(
            //     'style' => '',
            //     'title' => '',
            //     'title_color' => '',
            //     'caption' => '',
            //     'caption_color' => '',
            //     'item_margin' => ''
            // ), $atts));
            // echo 'adeel';
            return '<style>.af-woocommerce-link li,.af-woocommerce-link li ul{list-style:none;}.af-woocommerce-link{list-style:none;padding:0px;}</style><script type="text/javascript">jQuery(function(){ jQuery(".checkbox, .select-box").on("change",function(){jQuery("#wpaf-form").submit();});});</script>';
        }

        /**
        * Render HTMl
        * @since 1.0
        */
        function start_render(){

        }


    }
    new wpaf_Show();
}


