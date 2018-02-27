<?php
/**
 * Profiles Module
 */

$template_data = wmf_get_template_data();

$profiles = ! empty( $template_data['profiles_list'] ) ? $template_data['profiles_list'] : '';

if ( empty( $profiles ) || ! is_array( $profiles ) || count( $profiles ) < 3 ) {
	return;
}

$profile_list = array_rand( array_flip( $profiles ), 3 );
$headline     = ! empty( $template_data['headline'] ) ? $template_data['headline'] : '';

$default_pre_heading = get_post_type_object( 'profile' )->label;
$pre_heading         = ! empty( $template_data['pre_heading'] ) ? $template_data['pre_heading'] : $default_pre_heading;
?>

<div class="w-100p white-bg mod-margin-bottom">
	<div class="mw-1360 std-mod people-container">
		<h3 class="h3 color-gray">
			<?php echo esc_html( $pre_heading ); ?>
		</h3>

		<?php if ( ! empty( $headline ) ) : ?>
		<h2><?php echo esc_html( $headline ); ?></h2>
		<?php endif; ?>

		<div class="people slider-on-mobile flex flex-medium">
		<?php
		foreach ( $profile_list as $profile_id ) {
			$team_name = '';
			$team      = get_the_terms( $profile_id, 'role' );
			if ( ! empty( $team ) && ! is_wp_error( $team ) ) {
				$team_name = $team[0]->name;
			}
			wmf_get_template_part(
				'template-parts/modules/profiles/card', array(
					'title'  => get_the_title( $profile_id ),
					'img_id' => get_post_thumbnail_id( $profile_id ),
					'link'   => get_the_permalink( $profile_id ),
					'role'   => get_post_meta( $profile_id, 'profile_role', true ),
					'team'   => $team_name,
				)
			);
		}
		?>
		</div>
	</div>
</div>
