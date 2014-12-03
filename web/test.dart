import "package:polymer/polymer.dart";
import 'dart:html';
import 'components/scrollable_area.dart';

void hello() {
  ScrollableArea area = querySelector('scrollable-area');
  area.attributes.forEach((key,val){
    print("$key-$val");
  });
//  area.scroll(new Point(100,100));

  print(area.contentOffset);
}

void main(){
  initPolymer().run(() {
    // code here works most of the time
    Polymer.onReady.then((_) {
      // some things must wait until onReady callback is called

//      querySelector('scrollable-area').on
      hello();

    });
  });

//  document.querySelector("#BOB").onClick.listen((_) => hello());
}
