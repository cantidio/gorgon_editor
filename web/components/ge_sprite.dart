import 'dart:html';
import 'package:polymer/polymer.dart';
import 'package:gorgon/gorgon.dart';
/**
 * A Polymer Draggable element.
 */
@CustomTag('ge-sprite')
class GESprite extends PolymerElement {
  Sprite _sprite;
  Display _display;
  Point2D _position;

  @published Point2D get position => _position;

  @published void set position(Point2D position) {
    _position = position;
    redraw();
  }

  @published void set offset(Point2D offset) {
    _sprite.offset = offset;
    redraw();
  }

  @published Sprite get sprite => _sprite;

  @published void set sprite(Sprite sprite) {
    _sprite = sprite;
    _display = new Display(this.shadowRoot.children.last, width: this.parent.clientWidth, height: this.parent.clientWidth);
    redraw();
  }

  GESprite.created() : super.created() {
    _position = new Point2D.zero();
  }

  void redraw() {
    _display.setAsTarget();
    _display.clear();
    _sprite.draw(position);
  }

}
