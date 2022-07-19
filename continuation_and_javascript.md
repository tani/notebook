---
title: 継続とJavaScript
---

## JavaScript の歴史

継続について見るまえに、先ずJavaScriptの歴史について触れておこう。
JavaScriptの 第1版が公開されたのは 1995年、ウェブブラウザ Netscape Navigator 2.0の機能の一つとして公開された[^1]。
このき、JavaScriptの生みの親である Brendan Eich氏は ブラウザでSchemeを実行することを狙い JavaScriptを設計した[^2]。
読者の多くが知っている通り、Schemeは継続を第一級オブジェクトとして扱うプログラミング言語である。
その本質の一部を引き継いだJavaScriptも勿論、継続を前提としたプログラミング言語である。

## Rhino

JavaScriptのうち、継続を第一級オブジェクトとして扱っているプログラミング言語が存在する。
それはJavaScriptの大本であるMozillaが開発しているRhinoだ。

## 継続渡し形式

## 継続 と 非同期

[^2]: B. Eich, ``Popularity'', https://web.archive.org/web/20090305231040/https://weblogs.mozillazine.org/roadmap/archives/2008/04/popularity.html , Apr. 2008