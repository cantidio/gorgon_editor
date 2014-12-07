import 'package:polymer/polymer.dart';
import 'package:gorgon/gorgon.dart';
/**
 * A Polymer GESprite element.
 */
@CustomTag('ge-sprite')
class GESprite extends PolymerElement {
  Sprite _sprite;
  Point2D _position;
  double _alpha;

  @published Point2D get position => _position;

  @published Sprite get sprite => _sprite;

  @published void set position(Point2D position) {
    _position = position;
    this.fire('change');
  }

  @published void set offset(Point2D offset) {
    _sprite.offset = offset;
    this.fire('change');
  }

  @published void set alpha(double alpha) {
    _alpha = alpha;
    this.fire('change');
  }

  @published void set sprite(Sprite sprite) {
    _sprite = sprite;
    this.fire('change');
  }

  GESprite.created() : super.created() {
    _alpha = 1.0;
    _sprite = new Sprite();
    _position = new Point2D.zero();
  }

  void draw(Point2D position) {
    _sprite.draw(position, alpha: _alpha);
  }
}
