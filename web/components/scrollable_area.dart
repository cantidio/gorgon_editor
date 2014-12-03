import 'dart:html';
import 'dart:js';
import 'package:polymer/polymer.dart';

/**
 * A Polymer click counter element.
 */
@CustomTag('scrollable-area')
class ScrollableArea extends PolymerElement {
  int dragX;
  int dragY;
  int marginLeft=0;
  int marginTop=0;

  ScrollableArea.created() : super.created() {
  }

  void dragStart() {
    dragX = null;
    dragY = null;
  }

  void dragIt(Event e, MouseEvent detail, HtmlElement target){
    // TODO stop using this hack to get the correct event
    var event = new JsObject.fromBrowserObject(e);
    int shiftX = ( dragX != null) ? dragX - event['clientX'] : 0;
    int shiftY = ( dragY != null) ? dragY - event['clientY'] : 0;
    dragX = event['clientX'];
    dragY = event['clientY'];

    marginLeft += shiftX;
    marginTop += shiftY;

//    target.shadowRoot.host.children[]
    print(target.shadowRoot.lastChild);
    target.shadowRoot.children.last.style.marginLeft = "${marginLeft}px";
    target.shadowRoot.children.last.style.marginTop = "${marginTop}px";
  }
}
