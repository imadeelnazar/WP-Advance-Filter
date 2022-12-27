<?php
/**
 * This file will create Custom Rest API End Points.
 */
class WP_React_Settings_Rest_Route {

    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'create_rest_routes' ] );
    }

    public function create_rest_routes() {
        register_rest_route( 'wprk/v1', '/settings', [
            'methods' => 'GET',
            'callback' => [ $this, 'get_settings' ],
            'permission_callback' => [ $this, 'get_settings_permission' ]
        ] );
        register_rest_route( 'wprk/v1', '/settings', [
            'methods' => 'POST',
            'callback' => [ $this, 'save_settings' ],
            'permission_callback' => [ $this, 'save_settings_permission' ]
        ] );
    }

    public function get_settings() {
        $ciwp_title = get_option( 'wprk_settings_ciwp_title' );
        $response = [
            'ciwp_title' => $ciwp_title,
        ];

        return rest_ensure_response( $response );
    }

    public function get_settings_permission() {
        return true;
    }

    public function save_settings( $req ) {


        update_option( 'wprk_settings_ciwp_title', $req->get_params() );

        return rest_ensure_response( 'success' );

    }

    public function save_settings_permission() {
        return current_user_can( 'publish_posts' );
    }
}
new WP_React_Settings_Rest_Route();