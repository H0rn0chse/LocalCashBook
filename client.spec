# -*- mode: python -*-

block_cipher = None

added_files = [
         ( 'client.html', '.' ),
         ( 'client.js', '.' ),
         ( 'client.css', '.' ),
         ( 'base_database.sqlite3', '.' ),
         ( 'modules', 'modules' )
         ]


a = Analysis(['client.py', 'modules\database.py', 'modules\schemes.py'],
             binaries=[],
             datas=added_files,
             hiddenimports=[],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,
          [],
          name='Kassenbuch',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          runtime_tmpdir=None,
          console=True )
