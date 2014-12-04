import "package:polymer/polymer.dart";
import 'dart:html';
import 'components/scrollable_area.dart';

void hello() {
  ScrollableArea area = querySelector('scrollable-area');
//  area.attributes.forEach((key,val){
//    print("$key-$val");
//  });
  area.scroll(new Point(100,100));

  print(area.contentOffset);
}

void main(){
  initPolymer().run(() {
    Polymer.onReady.then((_) {
      ScrollableArea area = querySelector('scrollable-area');
//      querySelector('scrollable-area').onKeyDown.listen((e){
//        print('press scrollable-area');
//      });
//
//      querySelector('scrollable-area div').onKeyDown.listen((e){
//        print('coisa');
//      });



      hello();

    });
  });

//  document.querySelector("#BOB").onClick.listen((_) => hello());
}
