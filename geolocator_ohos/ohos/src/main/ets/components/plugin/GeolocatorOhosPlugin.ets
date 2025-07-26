// Copyright (c) 2025 Huawei Device Co., Ltd.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE_HW file.
// Based on Camera.java originally written by
// Copyright 2013 The Flutter Authors.
import { FlutterPlugin, FlutterPluginBinding, } from '@ohos/flutter_ohos';

import common from '@ohos.app.ability.common';
import MethodCallHandlerImpl from './MethodCallHandlerImpl';
import StreamHandlerImpl from './StreamHandlerImpl';
import LocationServiceHandlerImpl from './LocationServiceHandlerImpl';


/** GeolocatorOhosPlugin **/
export default class GeolocatorOhosPlugin implements FlutterPlugin {
  private methodCallHandler: MethodCallHandlerImpl | null = null;
  private streamHandler: StreamHandlerImpl | null = null;
  private locationServiceHandler: LocationServiceHandlerImpl | null = null;
  private context: common.UIAbilityContext;

  constructor() {
    this.context = getContext(this) as common.UIAbilityContext;
  }

  getUniqueClassName(): string {
    return "GeolocatorOhosPlugin"
  }

  onAttachedToEngine(binding: FlutterPluginBinding): void {
    this.methodCallHandler = new MethodCallHandlerImpl();
    this.methodCallHandler.startListening(binding);

    this.streamHandler = new StreamHandlerImpl();
    this.streamHandler.startListening(binding);

    this.locationServiceHandler = new LocationServiceHandlerImpl();
    this.locationServiceHandler.startListening(this.context, binding);

  }

  onDetachedFromEngine(binding: FlutterPluginBinding): void {
    if (this.methodCallHandler != null) {
      this.methodCallHandler.stopListening()
      this.methodCallHandler = null;
    }
    if (this.streamHandler != null) {
      this.streamHandler.stopListening();
      this.streamHandler = null;
    }
    if (this.locationServiceHandler != null) {
      this.locationServiceHandler.stopListening();
      this.locationServiceHandler = null;
    }
  }
}
