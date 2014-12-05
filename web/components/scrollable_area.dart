import 'dart:html';
import 'dart:js';
import 'package:polymer/polymer.dart';

/**
 * A Polymer Scrollable Area element.
 */
@CustomTag('scrollable-area')
class ScrollableArea extends PolymerElement {
  @published Point contentOffset;
  Point _dragPosition;

  ScrollableArea.created() : super.created() {
    contentOffset = new Point(_attrParseInt('content-offset-x'), _attrParseInt('content-offset-y'));
  }

  void scroll(Point shift) {
    contentOffset += shift;
    this.fire('change');
  }

  void dragStart(Event e) {
    _dragPosition = _getEventPosition(e);
  }

  void dragIt(Event e) {
    Point position = _getEventPosition(e);
    Point shift = _dragPosition - position;
    _dragPosition = position;

    scroll(shift);
  }

  void keyDown(KeyboardEvent e) {
    switch (e.keyCode) {
      case KeyCode.RIGHT:
        scroll(new Point(-1, 0));
        break;
      case KeyCode.LEFT:
        scroll(new Point(1, 0));
        break;
      case KeyCode.UP:
        scroll(new Point(0, 1));
        break;
      case KeyCode.DOWN:
        scroll(new Point(0, -1));
        break;
    }
  }

  Point _getEventPosition(Event e) {
    // TODO stop using this hack to get the correct event
    var event = new JsObject.fromBrowserObject(e);
    return new Point(event['clientX'], event['clientY']);
  }

  int _attrParseInt(String attributeName) {
    try {
      return int.parse(this.attributes[attributeName]);
    } on FormatException {
      return 0;
    }
  }
}
