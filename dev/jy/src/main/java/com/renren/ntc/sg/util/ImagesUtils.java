package com.renren.ntc.sg.util;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Locale;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.plugins.jpeg.JPEGImageWriteParam;


public class ImagesUtils {

   static  class MyImageWriteParam extends JPEGImageWriteParam {

        public MyImageWriteParam() {
            super(Locale.getDefault());
        }

        public void setCompressionQuality(float quality) {
            if (quality < 0.0F || quality > 1.0F) {
                throw new IllegalArgumentException("Quality out-of-bounds!");
            }
            this.compressionQuality = 256 - (quality * 256);
        }

    }

    public static void main (String []  args ){
        File ifile = new File("F:/20150227103232.jpg");
        File ofile = new File("F:/o.jpg");
        zipImageFile(ifile,ofile,100,100,1.0F);

    }

    /**
     * 等比例压缩图片文件<br> 先保存原文件，再压缩、上传  
     * @param oldFile  要进行压缩的文件  
     * @param newFile  新文件  
     * @param width  宽度 //设置宽度时（高度传入0，等比例缩放）  
     * @param height 高度 //设置高度时（宽度传入0，等比例缩放）  
     * @param quality 质量  
     * @return 返回压缩后的文件的全路径
     */
    public static String zipImageFile(File oldFile,File newFile, int width, int height,
                                      float quality) {
        if (oldFile == null) {
            return null;
        }
        try {
            /** 对服务器上的临时文件进行处理 */
            Image srcFile = ImageIO.read(oldFile);
            int w = srcFile.getWidth(null);
            //  System.out.println(w);
            int h = srcFile.getHeight(null);
            //  System.out.println(h);
            double bili;
            if(width>0){
                bili=width/(double)w;
                height = (int) (h*bili);
            }else{
                if(height>0){
                    bili=height/(double)h;
                    width = (int) (w*bili);
                }
            }
            /** 宽,高设定 */
            BufferedImage tag = new BufferedImage(width, height,
                    BufferedImage.TYPE_INT_RGB);
            tag.getGraphics().drawImage(srcFile, 0, 0, width, height, null);

            /** 压缩之后临时存放位置 */
            FileOutputStream out = new FileOutputStream(newFile);
            // 设置压缩比
//            ImageWriteParam iwparam = new MyImageWriteParam();
//            iwparam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
//            iwparam.setCompressionQuality(iwparam);
//
//            // 写图片
//            writer.write(null, new IIOImage(rendImage, null, null), iwparam);


        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return newFile.getAbsolutePath();
    }


}