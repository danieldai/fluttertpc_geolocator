// Copyright (c) 2025 Huawei Device Co., Ltd.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE_HW file.
// Based on Camera.java originally written by
// Copyright 2013 The Flutter Authors.
import { abilityAccessCtrl, bundleManager, Permissions } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { LocationPermission } from "./LocationPermission";
import common from '@ohos.app.ability.common';

export default class PermissionManager {
  async checkPermissions(): Promise<boolean> {
    const permissions: Array<Permissions> = ['ohos.permission.APPROXIMATELY_LOCATION', 'ohos.permission.LOCATION'];
    let grantStatus: abilityAccessCtrl.GrantStatus = await this.checkAccessToken(permissions[0]);
    let grantStatus2: abilityAccessCtrl.GrantStatus = await this.checkAccessToken(permissions[1]);
    if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED
      && grantStatus2 === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
      return true
    } else {
      return false
    }
  }

  async checkAccessToken(permission: Permissions): Promise<abilityAccessCtrl.GrantStatus> {
    let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
    let grantStatus: abilityAccessCtrl.GrantStatus = abilityAccessCtrl.GrantStatus.PERMISSION_DENIED;

    // 获取应用程序的accessTokenID
    let tokenId: number = 0;
    try {
      let bundleInfo: bundleManager.BundleInfo =
        await bundleManager.getBundleInfoForSelf(bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION);
      let appInfo: bundleManager.ApplicationInfo = bundleInfo.appInfo;
      tokenId = appInfo.accessTokenId;
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      console.error(`Failed to get bundle info for self. Code is ${err.code}, message is ${err.message}`);
    }

    // 校验应用是否被授予权限
    try {
      grantStatus = await atManager.checkAccessToken(tokenId, permission);
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      console.error(`Failed to check access token. Code is ${err.code}, message is ${err.message}`);
    }

    return grantStatus;
  }

  requestPermission(context: common.UIAbilityContext, success: (status: LocationPermission) => void,
    error: (err: BusinessError) => void): void {
    let permissions: Array<Permissions> = ['ohos.permission.LOCATION', 'ohos.permission.APPROXIMATELY_LOCATION'];
    let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
    // requestPermissionsFromUser会判断权限的授权状态来决定是否唤起弹窗
    atManager.requestPermissionsFromUser(context, permissions).then((data) => {
      let grantStatus: Array<number> = data.authResults;
      let length: number = grantStatus.length;
      let grantedCount = 0;
      for (let i = 0; i < length; i++) {
        if (grantStatus[i] === 0) {
          // 用户授权，可以继续访问目标操作
          grantedCount++;
        } else {
          // 用户拒绝授权，提示用户必须授权才能访问当前页面的功能，并引导用户到系统设置中打开相应的权限
        }
      }
      if (grantedCount == permissions.length) {
        success(LocationPermission.always);
      } else {
        success(LocationPermission.denied);
      }
      // 授权成功
    }).catch((err: BusinessError) => {
      console.error(`Failed to request permissions from user. Code is ${err.code}, message is ${err.message}`);
      error(err);
    })
  }
}