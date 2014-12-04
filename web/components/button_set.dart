import 'dart:html';
//import 'dart:js';
import 'package:polymer/polymer.dart';
import 'toggleable_button.dart';
/**
 * A Polymer Draggable element.
 */
@CustomTag('button-set')
class ButtonSet extends PolymerElement {


  ButtonSet.created() : super.created() {

  }
  void change(Event e){
    print('change called');
    if( e.target.pressed ){
    this.querySelectorAll('toggleable-button').forEach((Node button){
      if( e.target != button ){
        print(button);
        button.pressed=false;
      }
    });
    } else {
      e.target.pressed = true;
    }
//    this.shadowRoot.querySelectorAl
    }


}
