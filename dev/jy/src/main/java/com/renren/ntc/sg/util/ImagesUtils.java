package com.renren.ntc.sg.util;

import magick.ImageInfo;
import magick.MagickApiException;
import magick.MagickException;
import magick.MagickImage;

/**
 * Created with IntelliJ IDEA.
 * User: yunming.zhu
 * Date: 15-2-27
 * Time: 上午10:24
 * To change this template use File | Settings | File Templates.
 */
public class ImagesUtils {


        public static void main(String[] args) {
            resetsize("/data/images/cat/images/shop_2/20150227103232.jpg","/data/images/cat/images/shop_2/new.jpg");
        }
        public static void resetsize(String picFrom,String picTo){
            try{
                ImageInfo info=new ImageInfo(picFrom);
                MagickImage image=new MagickImage(new ImageInfo(picFrom));
                MagickImage scaled=image.scaleImage(120, 97);
                scaled.setFileName(picTo);
                scaled.writeImage(info);
            }catch(MagickApiException ex){
                ex.printStackTrace();
            } catch(MagickException ex)   {
                ex.printStackTrace();
            }
        }
}


