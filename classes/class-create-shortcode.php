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


            $html = '';
            foreach($this->data as $key => $items){
                if($tag == $items['fullName']){

                    // echo '<pre>';print_r($wp_query);
                    $terms = get_terms( $items['dataSource'], array(
                        'hide_empty' => false,
                    ) );

                    $html .= '<div class="af-woocommerce-item">';
                    foreach($terms as $term){
                        $link = add_query_arg( 'af_category', $term->slug , esc_url(get_permalink($current_url)) );
                        $html .= '<div class="af-woocommerce-link"><a href="'.esc_url($link).'">'.esc_html($term->name).'</a></div>';
                    }
                    $html .= '</div>';

                }
            }
            $output .= $html;

            return $output;
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
                if(isset($_GET['af_category']) && $_GET['af_category'] <> ''){
                    $query->set('tax_query', array(
                        array (
                            'taxonomy' => 'product_cat',
                            'field' => 'slug',
                            'terms' => $_GET['af_category']
                            )
                        )
                    );

                }else{
                    // $query->set('tax_query', array(
                    //     array (
                    //         'taxonomy' => 'product_cat',
                    //         'field' => 'slug',
                    //         'terms' => 'new-category'
                    //         )
                    //     )
                    // );
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
            return '';

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


