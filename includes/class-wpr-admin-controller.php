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
 * @subpackage WPR_Admin_Controller
 */
class WPR_Admin_Controller {
    /**
	 * Instance of this class.
	 *
	 * @since    0.8.0
	 *
	 * @var      object
	 */
	protected static $instance = null;

	/**
	 * Constructor
	 *
	 * @since     0.8.0
	 */
	private function __construct() {
	}

    /**
	 * Handle WP actions and filters.
	 *
	 * @since 	0.1.0
	 */
	private function do_hooks() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Return an instance of this class.
	 *
	 * @since     0.8.0
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
     * Register the routes for the objects of the controller.
     */
    public function register_routes() {
        $version = '1';
        $namespace = 'wpr/v' . $version;
        $base = 'settings';

        register_rest_route( $namespace, '/' . $base, array(
            array(
                'methods'               => WP_REST_Server::READABLE,
                'callback'              => array( $this, 'get_settings' ),
                'permission_callback'   => array( $this, 'get_settings_permissions_check' ),
                'args'                  => array(),
            ),
        ) );

		register_rest_route( $namespace, '/' . $base, array(
            array(
                'methods'               => WP_REST_Server::EDITABLE,
                'callback'              => array( $this, 'update_setting' ),
                'permission_callback'   => array( $this, 'update_setting_permissions_check' ),
                'args'                  => array(
                    'key' => array(
                        'validate_callback' => function ( $param, $request, $key ) {
                            return is_string( $param );
                        },
                    ),
					'value' => array(
                        'validate_callback' => function ( $param, $request, $key ) {
                            return is_string( $param );
                        },
                    ),
                ),
            ),
        ) );
    }


    /**
     * Get all settings
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function get_settings( $request ) {
        $settings = json_decode( get_option( 'wpr_settings' ), true );

        return new WP_REST_Response( $settings, 200 );
    }


    /**
     * Update a setting
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function update_setting( $request ) {
        $key = $request->get_param( 'key' );
		$value = $request->get_param( 'value' );

        $settings = json_decode( get_option( 'wpr_settings' ), true );

        $settings[$key] = $value;

        $update = update_option( 'wpr_settings', json_encode( $settings ) );

        if ( ! $update ) {
            return new WP_REST_Response( __( 'Update Setting Failed', 'wpreactivate' ), 200 );
        }

        $new_settings = json_decode( get_option( 'wpr_settings' ), true );

        return new WP_REST_Response( $new_settings, 200 );
    }

    /**
     * Check if a given request has access to retrieve current settings
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function get_settings_permissions_check( $request ) {
        return current_user_can( 'manage_options' );
    }

    /**
     * Check if a given request has access to update a setting
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function update_setting_permissions_check( $request ) {
        return current_user_can( 'manage_options' );
    }
}
