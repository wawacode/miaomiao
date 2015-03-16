package com.renren.ntc.sg.util;

import org.imgscalr.Scalr;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.*;
import java.util.Iterator;
import java.util.Locale;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.plugins.jpeg.JPEGImageWriteParam;
import javax.imageio.stream.ImageOutputStream;


public class ImagesUtils {

    public static boolean convertImage(InputStream ins, String newFilename) {
        BufferedImage originalImage;
        try {
            originalImage = ImageIO.read(ins);
            BufferedImage thumbnail = Scalr.resize(originalImage, Scalr.Method.SPEED, Scalr.Mode.FIT_TO_WIDTH,
                    400, 300, Scalr.OP_ANTIALIAS);

            if (!ImageIO.write(thumbnail, "JPEG", new File(newFilename)))  {
                System.out.println("File write failed.");
                return false;
            }
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public static void main(String[] args) {
        File ifile = new File("F:/20150227103232.jpg");
        try {
            convertImage(new FileInputStream(ifile), "F:/o.jpg");
        } catch (FileNotFoundException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

    }

    /**
     * 等比例压缩图片文件<br> 先保存原文件，再压缩、上传
     *
     * @param oldFile 要进行压缩的文件
     * @param newFile 新文件
     * @param quality 质量
     * @return 返回压缩后的文件的全路径
     */
    public static String zipImageFile(File oldFile, File newFile,
                                      float quality) {
        if (oldFile == null) {
            return null;
        }
        try {
            // 检索要压缩的图片
            RenderedImage rendImage = ImageIO.read(oldFile);

            // 准备输出文件
            ImageOutputStream out = ImageIO.createImageOutputStream(newFile);
            ImageWriter writer = null;
            Iterator iter = ImageIO.getImageWritersByFormatName("jpg");
            if (iter.hasNext()) {
                writer = (ImageWriter) iter.next();
            }
            writer.setOutput(out);
            //设置压缩比
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return newFile.getAbsolutePath();
    }
}