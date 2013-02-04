<?php

function decode_json_form($json){
	$form_items = json_decode($json);
	foreach($form_items as $item){
		// Text
		if($item->type == 'text'){
			?>
			<div>
				<?php echo $item->label; ?>: <input type="text" name="<?php echo $item->name; ?>">
			</div>
			<?php
		}
		// Checkbox
		if($item->type == 'checkbox'){
			?>
			<div>
				<?php echo $item->label; ?><br />
				<?php foreach($item->options as $option){ ?>
					<div><?php echo $option->label; ?>: <input type="checkbox" name="<?php echo $option->name; ?>"></div>
				<?php } ?>
			</div>
			<?php
		}
		// Radio
		if($item->type == 'radio'){
			?>
			<div>
				<?php echo $item->label; ?><br />
				<?php foreach($item->options as $option){ ?>
					<div><?php echo $option->label; ?>: <input type="radio" name="<?php echo $item->name; ?>" value="<?php echo $option->value; ?>"></div>
				<?php } ?>
			</div>
			<?php
		}
		// Select
		if($item->type == 'select'){
			?>
			<div>
				<?php echo $item->label; ?><br />
				<select name="<?php echo $item->name; ?>">
					<?php foreach($item->options as $option){ ?>
						<option value="<?php echo $option->value; ?>"><?php echo $option->label; ?></option>
					<?php } ?>
				</select>
			</div>
			<?php
		}
	}
}

decode_json_form('[{"type":"text","label":"A Text","name":"text_1"},{"type":"checkbox","label":"A Checkbox","options":[{"label":"one","name":"checkbox_1"},{"label":"two","name":"checkbox_2"},{"label":"three","name":"checkbox_3"}]},{"type":"radio","label":"A Radio","options":[{"label":"one","value":"value_one"},{"label":"two","value":"value_two"},{"label":"three","value":"value_three"}],"name":"radio_1"},{"type":"select","label":"A Select","options":[{"label":"one","value":"value_one"},{"label":"two","value":"value_two"},{"label":"three","value":"value_three"}],"name":"select_1"}]');

?>