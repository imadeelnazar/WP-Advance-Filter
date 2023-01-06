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
}