import 'dart:html';
import 'package:polymer/polymer.dart';

/**
 * A Polymer Draggable element.
 */
@CustomTag('toggleable-button')
class DraggableElement extends PolymerElement {
  @published bool pressed = false;

  DraggableElement.created() : super.created() {
  }

  void toggle() {
    pressed = !pressed;
    this.classes.toggle('toggleable-button-pressed');
  }

  void keyPress(KeyboardEvent e) {
    if (e.keyCode == KeyCode.ENTER || e.keyCode == KeyCode.SPACE) {
      this.fire('click');
    }
  }
}
