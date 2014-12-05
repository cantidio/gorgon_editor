import 'dart:html';
import 'package:polymer/polymer.dart';
import 'package:gorgon/gorgon.dart';
import 'ge_sprite.dart';
/**
 * A Polymer GEDisplay element.
 */
@CustomTag('ge-display')
class GEDisplay extends PolymerElement {
  Display _display;
  @published Point2D contentOffset = new Point2D.zero();

  int get width => _display.width;

  int get height => _display.height;

  GEDisplay.created() : super.created() {
    var container = this.shadowRoot.children.last;
    resize();

    MutationObserver observer = new MutationObserver(_layoutChange);
    observer.observe(this.parent, attributes:true, attributeFilter:['style']);
  }

  void resize() {
    _display = new Display(this.shadowRoot.children.last, width: this.parent.clientWidth, height: this.parent.clientHeight);
  }

  void redraw() {
    _display.setAsTarget();
    _display.clear();

    this.querySelectorAll('ge-sprite').forEach((GESprite sprite) {
      sprite.draw(contentOffset);
    });
  }

  void contentChange(Event e) {
    e.stopPropagation();
    redraw();
  }

  void _layoutChange(List<MutationRecord> mutations, MutationObserver observer) {
    resize();
  }
}
