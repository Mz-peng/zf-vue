package com.mzp.vueserver.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.mzp.vueserver.domain.entity.Auth;
import com.mzp.vueserver.domain.entity.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 * 权限 Mapper 接口
 * </p>
 *
 * @author maozp
 * @since 2023-05-04
 */
public interface AuthMapper extends BaseMapper<Auth> {

    List<Auth> selectAuthsByUserId(@Param("uId") Integer uId);
}
