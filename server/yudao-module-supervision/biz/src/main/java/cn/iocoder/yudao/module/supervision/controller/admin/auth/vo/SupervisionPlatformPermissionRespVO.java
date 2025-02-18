package cn.iocoder.yudao.module.supervision.controller.admin.auth.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Schema(description = "管理后台 - 平台权限信息 Response VO")
@Data
@Builder
public class SupervisionPlatformPermissionRespVO {

    @Schema(description = "是否可查看", required = true, example = "true")
    private Boolean canView;

    @Schema(description = "是否可编辑", required = true, example = "false")
    private Boolean canEdit;

    @Schema(description = "是否可上传", required = true, example = "false")
    private Boolean canUpload;

    @Schema(description = "是否可下载", required = true, example = "false")
    private Boolean canDownload;
}
