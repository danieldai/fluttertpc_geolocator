// Copyright (c) 2025 Huawei Device Co., Ltd.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE_HW file.
// Based on Camera.java originally written by
// Copyright 2013 The Flutter Authors.
import { geoLocationManager } from '@kit.LocationKit';

export enum ErrorCodes {
  activityMissing = 'ACTIVITY_MISSING',
  errorWhileAcquiringPosition = 'ERROR_WHILE_ACQUIRING_POSITION',
  locationServicesDisabled = 'LOCATION_SERVICES_DISABLED',
  permissionDefinitionsNotFound = 'PERMISSION_DEFINITIONS_NOT_FOUND',
  permissionDenied = 'PERMISSION_DENIED',
  permissionRequestInProgress = 'PERMISSION_REQUEST_IN_PROGRESS',
}

export function getErrorCodeString(code: ErrorCodes): string {
  switch (code) {
    case ErrorCodes.activityMissing:
      return "Activity is missing. This might happen when running a certain function from the background that requires a UI element (e.g. requesting permissions or enabling the location services).";
    case ErrorCodes.errorWhileAcquiringPosition:
      return "An unexpected error occurred while trying to acquire the device's position.";
    case ErrorCodes.locationServicesDisabled:
      return "Location services are disabled. To receive location updates the location services should be enabled.";
    case ErrorCodes.permissionDefinitionsNotFound:
      return "No location permissions are defined in the manifest. Make sure at least ACCESS_FINE_LOCATION or ACCESS_COARSE_LOCATION are defined in the manifest.";
    case ErrorCodes.permissionDenied:
      return "User denied permissions to access the device's location.";
    case ErrorCodes.permissionRequestInProgress:
      return "Already listening for location updates. If you want to restart listening please cancel other subscriptions first";
    default:
      throw new Error('Invalid error code');
  }
}

export enum LocationAccuracy {
  lowest = 0,
  low = 1,
  medium = 2,
  high = 3,
  best = 4,
  bestForNavigation = 5
}

export enum LocationAccuracyStatus {
  /// A approximate location will be returned (Approximate location).
  reduced = 0,

  /// The precise location of the device will be returned.
  precise = 1,
}


export function locationToMap(location: geoLocationManager.Location) {
  return {
    'latitude': getNum(location.latitude),
    'longitude': getNum(location.longitude),
    'timestamp': getNum(location.timeStamp),
    'altitude': getNum(location.altitude),
    'altitude_accuracy': getNum(location.altitudeAccuracy),
    'accuracy': getNum(location.accuracy),
    'speed': getNum(location.speed),
    'speed_accuracy': getNum(location.speedAccuracy),
    'heading': getNum(location.direction),
    'headingAccuracy': null,
    'is_mocked': false,
  };
}

function getNum(num: number) {
  return num == 0 ? 0.0001 : num;
}
