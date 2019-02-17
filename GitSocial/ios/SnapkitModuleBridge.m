//
//  SnapkitModuleBridge.m
//  GitSocial
//
//  Created by Hamza Mir on 2/16/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SnapkitModule, NSObject)

RCT_EXTERN_METHOD(sendImage:(NSString *)response)

@end
