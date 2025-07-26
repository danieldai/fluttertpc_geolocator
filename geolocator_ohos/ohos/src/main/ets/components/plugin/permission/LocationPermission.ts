// Copyright (c) 2025 Huawei Device Co., Ltd.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE_HW file.
// Based on Camera.java originally written by
// Copyright 2013 The Flutter Authors.
// 定义LocationPermission枚举
export enum LocationPermission {
  denied = 0, // Permission to access the device's location is denied by the user.
  deniedForever = 1, // Permission to access the device's location is denied for ever. The permission dialog will not been shown again until the user updates the permission in the App settings.
  whileInUse = 2, // Permission to access the device's location is allowed only while the App is in use.
  always = 3 // Permission to access the device's location is allowed even when the App is running in the background.
}

// 由于ArkTS中枚举值可以直接映射到数字，因此无需额外的方法来转换枚举值为整数。
// 如果需要一个方法来从整数转换回枚举，可以定义一个辅助函数：
function fromInt(value: number): LocationPermission | undefined {
  switch (value) {
    case 0:
      return LocationPermission.denied;
    case 1:
      return LocationPermission.deniedForever;
    case 2:
      return LocationPermission.whileInUse;
    case 3:
      return LocationPermission.always;
    default:
      return undefined;
  }
}