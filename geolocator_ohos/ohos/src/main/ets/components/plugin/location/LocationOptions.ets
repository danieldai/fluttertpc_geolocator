// Copyright (c) 2025 Huawei Device Co., Ltd.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE_HW file.
// Based on Camera.java originally written by
// Copyright 2013 The Flutter Authors.
import { LocationAccuracy } from "../utils/Utils";
import { MethodCall, } from '@ohos/flutter_ohos';

export class LocationOptions {
  private accuracy: LocationAccuracy;
  private distanceFilter: number;
  private timeInterval: number;
  private useMSLAltitude: boolean;

  constructor(accuracy: LocationAccuracy, distanceFilter: number, timeInterval: number, useMSLAltitude: boolean) {
    this.accuracy = accuracy;
    this.distanceFilter = distanceFilter;
    this.timeInterval = timeInterval;
    this.useMSLAltitude = useMSLAltitude;
  }

  static parseArguments(argumentsMap: Map<String, Object>): LocationOptions {
    if (argumentsMap == null) {
      return new LocationOptions(LocationAccuracy.best, 0, 5000, false);
    }
    const accuracy = argumentsMap.get('accuracy') as number | undefined;
    const distanceFilter = argumentsMap.get('distanceFilter') as number | undefined;
    const timeInterval = argumentsMap.get('timeInterval') as number | undefined;
    const useMSLAltitude = argumentsMap.get('useMSLAltitude') as boolean | undefined;
    let locationAccuracy = LocationAccuracy.best;
    if (accuracy !== undefined) {
      switch (accuracy) {
        case 0:
          locationAccuracy = LocationAccuracy.lowest;
          break;
        case 1:
          locationAccuracy = LocationAccuracy.low;
          break;
        case 2:
          locationAccuracy = LocationAccuracy.medium;
          break;
        case 3:
          locationAccuracy = LocationAccuracy.high;
          break;
        case 5:
          locationAccuracy = LocationAccuracy.bestForNavigation;
          break;
        case 4:
        default:
          break;
      }
    }
    return new LocationOptions(
      locationAccuracy,
      distanceFilter !== undefined ? distanceFilter : 0,
      timeInterval !== undefined ? timeInterval : 5000,
      useMSLAltitude === true
    );
  }

  getAccuracy(): LocationAccuracy {
    return this.accuracy;
  }

  getDistanceFilter(): number {
    return this.distanceFilter;
  }

  getTimeInterval(): number {
    return this.timeInterval;
  }

  isUseMSLAltitude(): boolean {
    return this.useMSLAltitude;
  }
}