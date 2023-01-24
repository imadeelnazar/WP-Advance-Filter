<?php
/**
 * This file will create Custom Rest API End Points.
 */
class WP_React_Settings_Rest_Route {

    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'create_rest_routes' ] );
    }

    public function create_rest_routes() {
        register_rest_route( 'wpaf/v1', '/settings', [
            'methods' => 'GET',
            'callback' => [ $this, 'get_settings' ],
            'permission_callback' => [ $this, 'get_settings_permission' ]
        ] );
        register_rest_route( 'wpaf/v1', '/settings', [
            'methods' => 'POST',
            'callback' => [ $this, 'save_settings' ],
            'permission_callback' => [ $this, 'save_settings_permission' ]
        ] );

       register_rest_route( 'wpaf/v1', '/templates', [
            'methods' => 'GET',
            'callback' => [ $this, 'get_templates' ],
            'permission_callback' => [ $this, 'get_templates_permission' ]
        ] );
        register_rest_route( 'wpaf/v1', '/templates', [
            'methods' => 'POST',
            'callback' => [ $this, 'save_templates' ],
            'permission_callback' => [ $this, 'save_templates_permission' ]
        ] );

    }

    public function get_settings() {
        $wpaf_settings = get_option( 'wpaf_settings' );
        $response = [
            'wpaf_settings' => $wpaf_settings,
        ];

        return rest_ensure_response( $response );
    }

    public function get_settings_permission() {
        return true;
    }

    public function save_settings( $req ) {


        update_option( 'wpaf_settings', $req->get_params() );

        return rest_ensure_response( 'success' );

    }

    public function save_settings_permission() {
        return current_user_can( 'publish_posts' );
    }





    public function get_templates() {
        $wpaf_templates = get_option( 'wpaf_templates' );
        $response = [
            'wpaf_templates' => $wpaf_templates,
        ];

        return rest_ensure_response( $response );
    }

    public function get_templates_permission() {
        return true;
    }

    public function save_templates( $req ) {


        update_option( 'wpaf_templates', $req->get_params() );

        return rest_ensure_response( 'success' );

    }

    public function save_templates_permission() {
        return current_user_can( 'publish_posts' );
    }
}
new WP_React_Settings_Rest_Route();