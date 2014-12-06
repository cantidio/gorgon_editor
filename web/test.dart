import "package:polymer/polymer.dart";
import 'dart:html';
import 'components/scrollable_area.dart';
import 'package:gorgon/gorgon.dart';

void hello() {
  ScrollableArea area = querySelector('scrollable-area');
  area.scroll(new Point(100, 100));
  print(area.contentOffset);
}

void main() {
  initPolymer().run(() {
    Polymer.onReady.then((_) {
//      querySelector('button-set').onChange.listen((Event e) {
//        print("button pressed: ${e.target.selected}");
//      });

      Sprite spr = new Sprite(imageSource: 'imgs/iori.gif', offset: new Point2D(-30, -30));
      spr.onLoad.then((_) {
        print('loaded');
        querySelector('ge-sprite-view').sprite = spr;
      });
//
//      hello();

    });
  });
}
