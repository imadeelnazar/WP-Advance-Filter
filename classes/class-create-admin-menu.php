<?php
/**
 * This file will create admin menu page.
 */

class WPAF_Create_Admin_Page {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'create_admin_menu' ] );
    }

    public function create_admin_menu() {
        $capability = 'manage_options';
        $slug = 'wpaf-settings';

        add_menu_page(
            __( 'WP AdvanceFilter', 'category-index-wp' ),
            __( 'WP AdvanceFilter', 'category-index-wp' ),
            $capability,
            $slug,
            [ $this, 'menu_page_template' ],
            'dashicons-buddicons-replies'
        );
    }

    public function menu_page_template() {
        // $dd = get_option('wpaf_settings_ciwp_title');
        // print_r($dd);
        echo '<div class="wrap"><div id="wpaf-admin-app"></div></div>';
    }

}
new WPAF_Create_Admin_Page();