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
 */

/**
 * @subpackage WPReactivate
 */
class WPReactivate_Shortcode {

	/**
	 * Instance of this class.
	 *
	 * @since    0.1.0
	 *
	 * @var      object
	 */
	protected static $instance = null;

    /**
	 * Return an instance of this class.
	 *
	 * @since     0.1.0
	 *
	 * @return    object    A single instance of this class.
	 */
	public static function get_instance() {

		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self;
            self::$instance->do_hooks();
		}

		return self::$instance;
	}

	/**
	 * Initialize the plugin by setting localization and loading public scripts
	 * and styles.
	 *
	 * @since     0.1.0
	 */
	private function __construct() {
        $plugin = WPReactivate::get_instance();
		$this->plugin_slug = $plugin->get_plugin_slug();
		$this->version = $plugin->get_plugin_version();

        add_shortcode( 'wp-reactivate', array( $this, 'shortcode') );
    }


	/**
	 * Handle WP actions and filters.
	 *
	 * @since 	0.1.0
	 */
	private function do_hooks() {
        add_action( 'wp_enqueue_scripts', array( $this, 'register_frontend_scripts' ) );
	}

    /**
	 * Register frontend-specific javascript
	 *
	 * @since     0.1.0
	 */
	public function register_frontend_scripts() {
        wp_register_script( $this->plugin_slug . '-shortcode-script', plugins_url( 'assets/js/shortcode.js', dirname( __FILE__ ) ), array( 'jquery' ), $this->version );
	}

    public function shortcode( $atts ) {
        wp_enqueue_script( $this->plugin_slug . '-shortcode-script' );

        $object = shortcode_atts( array(
			// Add your default attributes and values here
            'title'       => 'Hello world',
            'api_nonce'   => wp_create_nonce( 'wp_rest' ),
            'api_url'	  => site_url('/wp-json/wp-reactivate/v1/'),
        ), $atts, 'wp-reactivate' );

        wp_localize_script( $this->plugin_slug . '-shortcode-script', 'wpr_object', $object );

        ?><div id="wp-reactivate-frontend"></div><?php
    }
}
