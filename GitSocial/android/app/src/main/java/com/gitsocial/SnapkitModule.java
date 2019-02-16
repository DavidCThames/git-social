package com.gitsocial;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;
import android.util.Base64;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.snapchat.kit.sdk.SnapCreative;
import com.snapchat.kit.sdk.creative.api.SnapCreativeKitApi;
import com.snapchat.kit.sdk.creative.exceptions.SnapStickerSizeException;
import com.snapchat.kit.sdk.creative.media.SnapMediaFactory;
import com.snapchat.kit.sdk.creative.media.SnapSticker;
import com.snapchat.kit.sdk.creative.models.SnapLiveCameraContent;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class SnapkitModule extends ReactContextBaseJavaModule {

    RequestQueue queue;

    public SnapkitModule(ReactApplicationContext reactContext) {
        super(reactContext);
        queue = Volley.newRequestQueue(getReactApplicationContext());
    }

    @ReactMethod
    public void requestImage(String url) {
        // Request a string response from the provided URL.
        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                sendImage(response);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                error.printStackTrace();
            }
        }
        );

        // Add the request to the RequestQueue.
        queue.add(stringRequest);
    }

    private void sendImage(String response) {
        Bitmap decodedImage = decodeBase64(response);

        SnapCreativeKitApi snapCreativeKitApi = SnapCreative.getApi(getReactApplicationContext());
        SnapMediaFactory snapMediaFactory = SnapCreative.getMediaFactory(getReactApplicationContext());

        File f = bitmapToFile(decodedImage);

        SnapLiveCameraContent snapLiveCameraContent = new SnapLiveCameraContent();
        SnapSticker sticker = null;
        try {
            sticker = snapMediaFactory.getSnapStickerFromFile(f);
        } catch (SnapStickerSizeException e) {
            e.printStackTrace();
        }

        snapLiveCameraContent.setSnapSticker(sticker);
        snapCreativeKitApi.send(snapLiveCameraContent);
    }

    private Bitmap decodeBase64(String imageString) {
        byte[] imageBytes;
        imageBytes = Base64.decode(imageString, Base64.DEFAULT);
        Bitmap decodedImage = BitmapFactory.decodeByteArray(imageBytes, 0, imageBytes.length);
        return decodedImage;
    }

    private File bitmapToFile(Bitmap b) {
        File f = null;
        try {
            f = new File(getReactApplicationContext().getFilesDir(), "new_file.png");

            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            b.compress(Bitmap.CompressFormat.PNG, 100 /*ignored for PNG*/, bos);
            byte[] bitmapData = bos.toByteArray();

            FileOutputStream fos = new FileOutputStream(f);
            fos.write(bitmapData);
            fos.flush();
            fos.close();
            return f;
        }
        catch (FileNotFoundException e) {
            e.printStackTrace();
            return null;
        }

        catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String getName() {
        return "SnapkitModule";
    }
}
