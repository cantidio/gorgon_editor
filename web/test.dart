import "package:polymer/polymer.dart";
import 'dart:html';
import 'components/scrollable_area.dart';

void hello() {
  ScrollableArea area = querySelector('scrollable-area');

  area.scroll(new Point(100, 100));

  print(area.contentOffset);
}

void main() {
  initPolymer().run(() {
    Polymer.onReady.then((_) {

      querySelector('button-set').onChange.listen((Event e) {
        print("button pressed: ${e.target.selected}");
      });

      hello();

    });
  });
}
