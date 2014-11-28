import 'dart:html';
import 'package:polymer/polymer.dart';

/**
 * A Polymer click counter element.
 */
@CustomTag('scrollable-area')
class ScrollableArea extends PolymerElement {
  @published String state = "";
  @published int count = 0;
/*
stopped



* */
  ScrollableArea.created() : super.created() {
    print("created");


//    eventDelegates
  }

  void dragStart() {
    print("click");
  }
  void dragIt(MouseEvent event){
    print("dragging it");
    print(event.client.x);
    print(event.client.y);

  }
  void dragEnd(dynamic event){
    print("drag end");
  }

  void increment() {
    count++;
  }
}
