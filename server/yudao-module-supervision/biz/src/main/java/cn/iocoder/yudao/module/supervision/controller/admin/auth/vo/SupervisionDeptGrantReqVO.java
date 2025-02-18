package cn.iocoder.yudao.module.supervision.controller.admin.auth.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Schema(description = "管理后台 - 部门年度权限授权 Request VO")
@Data
public class SupervisionDeptGrantReqVO {

    @Schema(description = "部门编号", required = true, example = "1024")
    @NotNull(message = "部门编号不能为空")
    private Long deptId;

    @Schema(description = "状态", required = true, example = "1")
    @NotNull(message = "状态不能为空")
    private Integer status;

    @Schema(description = "年度", required = true, example = "2025")
    @NotNull(message = "年度不能为空")
    private Integer year;
}
