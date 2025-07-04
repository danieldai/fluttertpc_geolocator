# Flutter geolocator plugin

The Flutter geolocator plugin is built following the federated plugin architecture. A detailed explanation of the federated plugin concept can be found in the [Flutter documentation](https://flutter.dev/docs/development/packages-and-plugins/developing-packages#federated-plugins). This means the geolocator plugin is separated into the following packages:

1. [`geolocator`][1]: the app facing package. This is the package users depend on to use the plugin in their project. For details on how to use the [`geolocator`][1] plugin you can refer to its [README.md][2] file.
2. [`geolocator_ohos`][3]: this package contains the endorsed ohos implementation of the geolocator_platform_interface and adds ohos support to the [`geolocator`][1] app facing package. More information can be found in its [README.md][4] file;
3. [`geolocator_android`][5]: this package contains the endorsed Android implementation of the geolocator_platform_interface and adds Android support to the [`geolocator`][1] app facing package. More information can be found in its [README.md][6] file;
4. [`geolocator_apple`][7]: this package contains the endorsed iOS and macOS implementations of the geolocator_platform_interface and adds iOS and macOS support to the [`geolocator`][1] app facing package. More information can be found in its [README.md][8] file;
5. [`geolocator_web`][9]: this package contains the endorsed web implementation of the geolocator_platform_interface and adds web support to the [`geolocator`][1] app facing package. More information can be found in its [README.md][10] file;
6. [`geolocator_windows`][11]: this package contains the endorsed Windows implementation of the geolocator_platform_interface and adds Windows support to the [`geolocator`][1] app facing package. More information can be found in its [README.md][12] file;
7. [`geolocator_platform_interface`][13]: this package declares the interface which all platform packages must implement to support the app-facing package. Instructions on how to implement a platform package can be found in the [README.md][14] of the [`geolocator_platform_interface`][13] package.

[1]: ./geolocator
[2]: ./geolocator/README.md
[3]: ./geolocator_ohos
[4]: ./geolocator_ohos/README.md
[5]: ./geolocator_android
[6]: ./geolocator_android/README.md
[7]: ./geolocator_apple
[8]: ./geolocator_apple/README.md
[9]: ./geolocator_web
[10]: ./geolocator_web/README.md
[11]: ./geolocator_windows
[12]: ./geolocator_windows/README.md
[13]: ./geolocator_platform_interface
[14]: ./geolocator_platform_interface/README.md
