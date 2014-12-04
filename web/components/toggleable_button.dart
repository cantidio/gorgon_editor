import 'dart:html';
import 'package:polymer/polymer.dart';

/**
 * A Polymer Draggable element.
 */
@CustomTag('toggleable-button')
class DraggableElement extends PolymerElement {
  bool _pressed = false;

  @published bool get pressed => _pressed;

  @published void set pressed(bool press) {
    if (press != _pressed) {
      _pressed = press;
      this.classes.toggle('toggleable-button-pressed');
      this.fire('change');
    }
  }

  DraggableElement.created() : super.created() {
  }

  void toggle() {
    pressed = !_pressed;
  }

  void keyPress(KeyboardEvent e) {
    if (e.keyCode == KeyCode.ENTER || e.keyCode == KeyCode.SPACE) {
      this.fire('click');
    }
  }
}
