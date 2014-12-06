import 'dart:html';
import 'dart:js';
import 'package:polymer/polymer.dart';

/**
 * A Polymer Draggable element.
 */
@CustomTag('draggable-element')
class DraggableElement extends PolymerElement {
  @published Point position;
  Point _dragPosition;

  DraggableElement.created() : super.created() {
    position = new Point(0, 0);
    lockSize();
  }

  void lockSize() {
    this.style.width = "${this.clientWidth}px";
    this.style.height = "${this.clientHeight}px";
  }

  void move(Point offset) {
    position += offset;
    this.fire('drag');
  }

  void keyDown(KeyboardEvent e) {
    bool consume = true;
    switch (e.keyCode) {
      case KeyCode.RIGHT:
        move(new Point(1, 0));
        break;
      case KeyCode.LEFT:
        move(new Point(-1, 0));
        break;
      case KeyCode.UP:
        move(new Point(0, -1));
        break;
      case KeyCode.DOWN:
        move(new Point(0, 1));
        break;
      default:
        consume = false;
    }
    if (consume) {
      e.stopPropagation();
    }
  }

  void dragStart(Event e) {
    _dragPosition = _getEventPosition(e);
  }

  void dragIt(Event e) {
    Point position = _getEventPosition(e);
    Point offset = position - _dragPosition;
    _dragPosition = position;

    move(offset);

    e.stopPropagation();
  }

  Point _getEventPosition(Event e) {
    // TODO stop using this hack to get the correct event
    var event = new JsObject.fromBrowserObject(e);
    return new Point(event['clientX'], event['clientY']);
  }
}
