import "package:polymer/polymer.dart";
import 'dart:html';
import 'components/scrollable_area.dart';
import 'package:gorgon/gorgon.dart';

void hello() {
  ScrollableArea area = querySelector('scrollable-area');

//  area.scroll(new Point(100, 100));

  print(area.contentOffset);
}

void main() {
  initPolymer().run(() {
    Polymer.onReady.then((_) {

      querySelector('button-set').onChange.listen((Event e) {
        print("button pressed: ${e.target.selected}");
      });

      Sprite spr = new Sprite(imageSource: 'imgs/iori.gif', offset: new Point2D(-30, -30));
      spr.onLoad.then((_) {
        print('loaded');
        querySelector('ge-sprite')
          ..sprite = spr
          ..position = querySelector('scrollable-area').contentOffset;

        querySelector('draggable-element')
          ..style.width = "${spr.width}px"
          ..style.height = "${spr.height}px"
          ..position = spr.offset
          ..onChange.listen((Event e) {
          e.stopImmediatePropagation();
          querySelector('ge-sprite').offset = e.target.position;
        });
      });

      querySelector('scrollable-area').onChange.listen((Event e) {
        querySelector('ge-sprite').position = e.target.contentOffset;
      });

      hello();

    });
  });
}
