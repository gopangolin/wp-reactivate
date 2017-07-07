<?php
/**
 * WP-Reactivate
 *
 *
 * @package   WP-Reactivate
 * @author    Pangolin
 * @license   GPL-3.0
 * @link      https://gopangolin.com
 * @copyright 2017 Pangolin (Pty) Ltd
 *
 * @wordpress-plugin
 * Plugin Name:       WP-Reactivate
 * Plugin URI:        https://gopangolin.com
 * Description:       React boilerplate for WordPress plugins
 * Version:           0.8.1
 * Author:            pangolin
 * Author URI:        https://gopangolin.com
 * Text Domain:       wp-reactivate
 * License:           GPL-3.0
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'WP_REACTIVATE_VERSION', '0.8.1' );


require_once( plugin_dir_path( __FILE__ ) . 'includes/class-wpr.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/class-wpr-admin.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/class-wpr-shortcode.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/class-wpr-widget.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/class-wpr-rest-controller.php' );

/**
 * Initialize Plugin
 *
 * @since 0.8.0
 */
function wp_reactivate_init() {
	$wpr = WPReactivate::get_instance();
	$wpr_shortcode = WPReactivate_Shortcode::get_instance();
	$wpr_admin = WPReactivate_Admin::get_instance();
	$wpr_rest = WPReactivate_REST_Controller::get_instance();
}
add_action( 'plugins_loaded', 'wp_reactivate_init' );

/**
 * Register the widget
 *
 * @since 0.8.0
 */
function wp_reactivate_widget() {
	register_widget( 'WPR_Widget' );
}
add_action( 'widgets_init', 'wp_reactivate_widget' );

/**
 * Register activation and deactivation hooks
 */
register_activation_hook( __FILE__, array( 'WPReactivate', 'activate' ) );
register_deactivation_hook( __FILE__, array( 'WPReactivate', 'deactivate' ) );

