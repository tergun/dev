package cn.iocoder.yudao.module.supervision.controller.admin.auth;

import cn.iocoder.yudao.framework.common.pojo.CommonResult;
import cn.iocoder.yudao.module.system.api.dept.DeptApi;
import cn.iocoder.yudao.module.system.api.permission.PermissionApi;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;

import static cn.iocoder.yudao.framework.common.pojo.CommonResult.success;

@Tag(name = "管理后台 - 项目督办权限")
@RestController
@RequestMapping("/supervision/auth")
@Validated
public class SupervisionAuthController {

    @Resource
    private DeptApi deptApi;
    @Resource
    private PermissionApi permissionApi;

    @PostMapping("/dept/grant")
    @Operation(summary = "授权部门年度权限")
    @PreAuthorize("@ss.hasPermission('supervision:auth:grant')")
    public CommonResult<Boolean> grantDeptPermission(@Valid @RequestBody SupervisionDeptGrantReqVO reqVO) {
        // 验证超级管理员权限
        if (!permissionApi.hasAnyRoles(getUserId(), "supervision_admin")) {
            throw exception(PERMISSION_DENIED);
        }
        
        // 更新部门权限
        deptApi.updateDeptStatus(reqVO.getDeptId(), reqVO.getStatus());
        return success(true);
    }

    @GetMapping("/platform")
    @Operation(summary = "获取平台权限")
    public CommonResult<SupervisionPlatformPermissionRespVO> getPlatformPermission() {
        // 检查是否为桌面端
        boolean isDesktop = ServletUtils.getUserAgent().contains("Windows") 
            || ServletUtils.getUserAgent().contains("Macintosh");
        
        // 桌面端拥有所有权限，移动端只有查看权限
        return success(SupervisionPlatformPermissionRespVO.builder()
            .canView(true)
            .canEdit(isDesktop)
            .canUpload(isDesktop)
            .canDownload(isDesktop)
            .build());
    }
}
