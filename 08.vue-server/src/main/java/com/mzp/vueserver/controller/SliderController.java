package com.mzp.vueserver.controller;


import com.mzp.vueserver.domain.R;
import com.mzp.vueserver.domain.entity.Slider;
import com.mzp.vueserver.service.SliderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * 轮播图(Slider)表控制层
 *
 * @author makejava
 * @since 2023-05-02 21:33:39
 */
@RestController
@RequestMapping("slider")
public class SliderController {
    /**
     * 服务对象
     */
    @Resource
    private SliderService sliderService;

    /**
     * 查询所有数据
     *
     * @return 所有数据
     */
    @ResponseBody
    @GetMapping("/selectAll")
    public R<List<Slider>> selectAll() {
        return R.ok(this.sliderService.list());
    }

}

