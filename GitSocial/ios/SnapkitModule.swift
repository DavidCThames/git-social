//
//  SnapkitModule.swift
//  GitSocial
//
//  Created by Hamza Mir on 2/16/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import UIKit
import SCSDKCreativeKit

@objc(SnapkitModule)
class SnapkitModule: NSObject {
  
  @objc(sendImage:)
  func sendImage(response: String) -> Void {
    let dataDecoded : Data = Data(base64Encoded: response, options: .ignoreUnknownCharacters)!
    
    let image : UIImage = UIImage(data: dataDecoded)!
    
    let sticker = SCSDKSnapSticker(stickerImage: image)
    
    let snap = SCSDKNoSnapContent()
    snap.sticker = sticker
    snap.attachmentUrl = "https://developer.here.com"
    
    let api = SCSDKSnapAPI(content: snap)
    api.startSnapping { (error) in }

  }
}
