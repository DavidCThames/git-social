package com.example.work;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Environment;
import android.os.StrictMode;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Base64;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;

import com.snapchat.kit.sdk.SnapCreative;
import com.snapchat.kit.sdk.creative.api.SnapCreativeKitApi;
import com.snapchat.kit.sdk.creative.exceptions.SnapMediaSizeException;
import com.snapchat.kit.sdk.creative.media.SnapMediaFactory;
import com.snapchat.kit.sdk.creative.media.SnapPhotoFile;
import com.snapchat.kit.sdk.creative.models.SnapPhotoContent;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class MainActivity extends AppCompatActivity {

    private Bitmap decodeBase64(String imageString) {
        byte[] imageBytes;
        imageBytes = Base64.decode(imageString, Base64.DEFAULT);
        Bitmap decodedImage = BitmapFactory.decodeByteArray(imageBytes, 0, imageBytes.length);
        return decodedImage;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        Bitmap bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.insta);
//        System.out.println(bitmap);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos);
        byte[] imageBytes = baos.toByteArray();
        String imageString = Base64.encodeToString(imageBytes, Base64.DEFAULT);
	// Instantiate the RequestQueue.
	RequestQueue queue = Volley.newRequestQueue(this);
	String url ="http://git-social.com/api/v1/image";
	
	// Request a string response from the provided URL.
	StringRequest stringRequest = new StringRequest(Request.Method.GET, url,new Response.Listener<String>() {
		@Override
		public void onResponse(String response) {
		    // Display the first 500 characters of the response string.
		    //		    mTextView.setText("Response is: "+ response.substring(0,500));
		    imageString = response
		}
	    }, new Response.ErrorListener() {
		    @Override
		    public void onErrorResponse(VolleyError error) {
			mTextView.setText("That didn't work!");
		    }
		});

	// Add the request to the RequestQueue.
	queue.add(stringRequest);



        Bitmap decodedImage = decodeBase64(imageString);

        SnapCreativeKitApi snapCreativeKitApi = SnapCreative.getApi(this);
        SnapMediaFactory snapMediaFactory = SnapCreative.getMediaFactory(this);

        File f = bitmapToFile(decodedImage);

        SnapPhotoContent snp = null;
        SnapPhotoFile spf = null;
        try {
            spf = snapMediaFactory.getSnapPhotoFromFile(f);
        } catch (SnapMediaSizeException e) {
            System.out.println(e);
        }

        snp = new SnapPhotoContent(spf);

        System.out.println("survive");
        snapCreativeKitApi.send(snp);
        System.out.println("die?");
    }

    private File bitmapToFile(Bitmap b) {
        File f = null;
        try {
            f = new File(getExternalFilesDir(Environment.DIRECTORY_PICTURES), "new_file.png");
            f.createNewFile();

            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            b.compress(Bitmap.CompressFormat.JPEG, 100 /*ignored for PNG*/, bos);
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
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
