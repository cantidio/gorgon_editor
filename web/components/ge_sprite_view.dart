import 'dart:html';
import 'package:polymer/polymer.dart';
import 'package:gorgon/gorgon.dart';
import 'ge_display.dart';
import 'ge_sprite.dart';
import 'draggable_element.dart';
import 'scrollable_area.dart';
/**
 * A Polymer GESpriteView element.
 */
@CustomTag('ge-sprite-view')
class GESpriteView extends PolymerElement {

  GESprite _sprite;
  GEDisplay _display;
  DraggableElement _draggable;
  ScrollableArea _scrollable;

  GESpriteView.created() : super.created() {
  }

  void ready() {
    _scrollable = this.shadowRoot.querySelector('scrollable-area');
    _draggable = this.shadowRoot.querySelector('draggable-element');
    _display = this.shadowRoot.querySelector('ge-display');
    _sprite = this.shadowRoot.querySelector('ge-sprite');
    scrollToCenter();
  }

  void spriteDrag() {
    _sprite.offset = new Point2D(_draggable.position.x, _draggable.position.y);
  }

  void spriteDragOn() {
    _sprite.alpha = 0.5;
  }

  void spriteDragOff() {
    _sprite.alpha = 1.0;
  }

  void areaScroll() {
    _display.contentOffset = _scrollable.contentOffset;
    _display.redraw();
  }

  void set sprite(Sprite spr) {
    _sprite.sprite = spr;
    _draggable
      ..style.width = "${spr.width}px"
      ..style.height = "${spr.height}px"
      ..position = new Point(spr.offset.x, spr.offset.y);
  }

  void scrollToCenter() {
    _scrollable.contentOffset = new Point(this.clientWidth / 2, this.clientHeight / 2);
    areaScroll();
  }
}
