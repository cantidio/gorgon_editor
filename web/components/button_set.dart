import 'dart:html';
import 'package:polymer/polymer.dart';
import 'toggleable_button.dart';
/**
 * A Polymer ButtonSet element.
 */
@CustomTag('button-set')
class ButtonSet extends PolymerElement {
  int _selected;

  @published int get selected => this.querySelectorAll('toggleable-button').indexOf(selectedButton) ;

  @published void set selected(int index) {
    var buttons = this.querySelectorAll('toggleable-button');
    if (buttons.length > index) {
      buttons[index].click();
      _selected = index;
    }
    _updateAttributes();
  }

  ToggleableButton get selectedButton {
    return this.querySelector('toggleable-button.toggleable-button-pressed');
  }

  ButtonSet.created() : super.created() {
    selected = _attrParseInt('selected');
  }

  void changed(Event e) {
    e.stopImmediatePropagation();
    this.querySelectorAll('toggleable-button').forEach((ToggleableButton button) {
      button.pressed = false;
    });
    e.target.pressed = true;
    _updateAttributes();

    if (_selected != selected) {
      _selected = selected;
      this.asyncFire('change');
    }
  }

  void _updateAttributes() {
    this.attributes['selected'] = "$selected";
  }

  int _attrParseInt(String attributeName) {
    try {
      return int.parse(this.attributes[attributeName]);
    } on FormatException {
      return 0;
    }
  }
}
