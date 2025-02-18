package cn.iocoder.yudao.module.supervision.controller.admin.file;

import cn.iocoder.yudao.framework.common.pojo.CommonResult;
import cn.iocoder.yudao.module.infra.api.file.FileApi;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import static cn.iocoder.yudao.framework.common.pojo.CommonResult.success;

@Tag(name = "管理后台 - 项目督办文件")
@RestController
@RequestMapping("/supervision/file")
@Validated
public class SupervisionFileController {

    @Resource
    private FileApi fileApi;

    @PostMapping("/upload")
    @Operation(summary = "上传文件")
    @PreAuthorize("@ss.hasPermission('supervision:file:upload')")
    public CommonResult<String> uploadFile(@RequestParam("file") MultipartFile file) {
        // 验证是否为桌面端
        if (!isDesktopClient()) {
            throw exception(OPERATION_FORBIDDEN_ON_MOBILE);
        }
        
        // 上传文件
        return success(fileApi.createFile(file.getOriginalFilename(), file.getContentType(), file.getBytes()));
    }

    @GetMapping("/download/{fileId}")
    @Operation(summary = "下载文件")
    @PreAuthorize("@ss.hasPermission('supervision:file:download')")
    public void downloadFile(@PathVariable("fileId") Long fileId,
                           HttpServletResponse response) throws Exception {
        // 验证是否为桌面端
        if (!isDesktopClient()) {
            throw exception(OPERATION_FORBIDDEN_ON_MOBILE);
        }
        
        // 获取文件信息
        byte[] fileContent = fileApi.getFileContent(fileId);
        if (fileContent == null) {
            throw exception(FILE_NOT_EXISTS);
        }
        
        // 输出文件
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment;filename=" + fileId);
        response.getOutputStream().write(fileContent);
    }

    private boolean isDesktopClient() {
        String userAgent = ServletUtils.getUserAgent();
        return userAgent.contains("Windows") || userAgent.contains("Macintosh");
    }
}
