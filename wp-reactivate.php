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
 * Version:           0.1.0
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


require_once( plugin_dir_path( __FILE__ ) . 'includes/class-wpr.php' );
add_action( 'plugins_loaded', array( 'WPReactivate', 'get_instance' ) );

if ( is_admin() ) {
    require_once( plugin_dir_path( __FILE__ ) . 'includes/class-wpr-admin.php' );
    add_action( 'plugins_loaded', array( 'WPReactivate_Admin', 'get_instance' ) );
}
/*
 * Register activation and deactivation hooks
 */
register_activation_hook( __FILE__, array( 'WPReactivate', 'activate' ) );
register_deactivation_hook( __FILE__, array( 'WPReactivate', 'deactivate' ) );
